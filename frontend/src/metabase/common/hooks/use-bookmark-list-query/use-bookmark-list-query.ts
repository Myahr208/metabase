import type { Bookmark } from "metabase-types/api";
import Bookmarks from "metabase/entities/bookmarks";

import type {
  UseEntityListQueryProps,
  UseEntityListQueryResult,
} from "../use-entity-list-query";
import { useEntityListQuery } from "../use-entity-list-query";

export const useBookmarkListQuery = (
  props: UseEntityListQueryProps = {},
): UseEntityListQueryResult<Bookmark> => {
  return useEntityListQuery(props, {
    fetchList: Bookmarks.actions.fetchList,
    getError: Bookmarks.selectors.getError,
    getList: Bookmarks.selectors.getList,
    getLoaded: Bookmarks.selectors.getLoaded,
    getLoading: Bookmarks.selectors.getLoading,
    getListMetadata: Bookmarks.selectors.getListMetadata,
  });
};
