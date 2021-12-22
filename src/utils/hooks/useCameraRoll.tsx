import {useState, useEffect, useRef, useCallback} from 'react';
import {Platform} from 'react-native';

import CameraRoll, {
  GetPhotosParams,
  GroupType,
  AssetType,
  PhotoIdentifier,
} from '@react-native-community/cameraroll';

export interface ImageNodeProps {
  /** Only set if the `include` parameter contains `filename`. */
  filename: string | null;
  uri: string;
  /** Only set if the `include` parameter contains `imageSize`. */
  height: number;
  /** Only set if the `include` parameter contains `imageSize`. */
  width: number;
  /** Only set if the `include` parameter contains `fileSize`. */
  fileSize: number | null;
  /**
   * Only set if the `include` parameter contains `playableDuration`.
   * Will be null for images.
   */
  playableDuration: number | null;
}

export interface PhotoNodeProps {
  type: string;
  group_name: string;
  image: ImageNodeProps;
  /** Timestamp in seconds. */
  timestamp: number;
  /** Only set if the `include` parameter contains `location`. */
  location: {
    latitude?: number;
    longitude?: number;
    altitude?: number;
    heading?: number;
    speed?: number;
  } | null;
}

interface defaultConfigProps {
  groupTypes: GroupType;
  batchSize: number;
  assetType: AssetType;
  maxDuration?: number;
}

interface resultProps {
  medias: PhotoNodeProps[];
  loading: boolean;
  error: any;
  hasLoadMore: any;
}

const defaultConfig: defaultConfigProps = {
  groupTypes: 'All',
  batchSize: 100,
  assetType: 'Photos',
};

const convertLocalIdentifierToAssetLibrary = (
  localIdentifier: string,
  ext: string,
): string => {
  const hash = localIdentifier.split('/')[0];
  return `assets-library://asset/asset.${ext}?id=${hash}&ext=${ext}`;
};

export const usePagingCameraRoll = (
  initConfig: defaultConfigProps = defaultConfig,
  startPage: number = 1,
): [
  state: resultProps,
  setConfig: (value: defaultConfigProps) => void,
  setNextPage: () => void,
] => {
  const [medias, setMedias] = useState<PhotoNodeProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [config, setConfig] = useState(initConfig);
  const [page, setPage] = useState(startPage);
  const [hasLoadMore, setHasLoadMore] = useState<any>(true);

  const seen = useRef(new Set());
  const lastCursor = useRef<any>('');

  const setNextPage = useCallback(() => {
    if (hasLoadMore) {
      setPage(prev => prev + 1);
    }
  }, [hasLoadMore]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const fetchParams: GetPhotosParams = {
        first: config.batchSize,
        groupTypes: config.groupTypes,
        assetType: config.assetType,
      };
      if (lastCursor.current) {
        fetchParams.after = lastCursor.current;
      }
      try {
        setLoading(true);
        const data = await CameraRoll.getPhotos(fetchParams);

        const newAssets: PhotoIdentifier[] = data.edges;
        if (data.page_info.has_next_page) {
          setHasLoadMore(data.page_info.has_next_page);
        } else {
          setHasLoadMore(false);
        }

        if (newAssets.length > 0) {
          lastCursor.current = data.page_info.end_cursor;

          const uniqAssets: PhotoNodeProps[] = [];
          for (let index = 0; index < newAssets.length; index++) {
            const asset: PhotoIdentifier = newAssets[index];
            const value = asset.node.image.uri;
            const duration: number = asset.node.image.playableDuration || 0;

            if (
              seen.current.has(value) ||
              (!!initConfig.maxDuration && duration > initConfig.maxDuration)
            ) {
              continue;
            }
            seen.current.add(value);
            if (asset.node) {
              if (Platform.OS === 'ios') {
                let tmp: PhotoNodeProps = asset.node;
                tmp.image.uri = convertLocalIdentifierToAssetLibrary(
                  tmp.image.uri.replace('ph://', ''),
                  tmp.type === 'image' ? 'jpg' : 'mov',
                );
                uniqAssets.push({
                  ...tmp,
                  type: asset.node.type?.replace?.(/\/.+$/i, '') || '',
                });
              } else {
                uniqAssets.push({
                  ...asset.node,
                  type: asset.node.type?.replace?.(/\/.+$/i, ''),
                });
              }
            }
          }
          setMedias(curPhoto => {
            return [...curPhoto, ...uniqAssets];
          });
        }
        setLoading(false);
      } catch (err: any) {
        setError(err);
      }
    };

    fetchPhotos();
  }, [config, setMedias, page]);

  return [{medias, loading, error, hasLoadMore}, setConfig, setNextPage];
};
