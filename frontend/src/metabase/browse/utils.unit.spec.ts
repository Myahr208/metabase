import type { SearchResult } from "metabase-types/api";
import {
  createMockCollection,
  createMockModelResult,
} from "metabase-types/api/mocks";
import { defaultRootCollection } from "metabase/admin/permissions/pages/CollectionPermissionsPage/tests/setup";
import type { ActualModelFilters, AvailableModelFilters } from "./utils";
import { filterModels, groupModels } from "./utils";

const collectionAlpha = createMockCollection({ id: 0, name: "Alpha" });
const collectionBeta = createMockCollection({ id: 1, name: "Beta" });
const collectionCharlie = createMockCollection({ id: 2, name: "Charlie" });
const collectionDelta = createMockCollection({ id: 3, name: "Delta" });
const collectionZulu = createMockCollection({ id: 4, name: "Zulu" });
const collectionAngstrom = createMockCollection({ id: 5, name: "Ångström" });
const collectionOzgur = createMockCollection({ id: 6, name: "Özgür" });

const mockModels: SearchResult[] = [
  {
    id: 0,
    name: "Model 0",
    collection: collectionAlpha,
    last_editor_common_name: "Bobby",
    last_edited_at: "2024-12-15T11:59:59.000Z",
  },
  {
    id: 1,
    name: "Model 1",
    collection: collectionAlpha,
    last_editor_common_name: "Bobby",
    last_edited_at: "2024-12-15T11:59:30.000Z",
  },
  {
    id: 2,
    name: "Model 2",
    collection: collectionAlpha,
    last_editor_common_name: "Bobby",
    last_edited_at: "2024-12-15T11:59:00.000Z",
  },
  {
    id: 3,
    name: "Model 3",
    collection: collectionBeta,
    last_editor_common_name: "Bobby",
    last_edited_at: "2024-12-15T11:50:00.000Z",
  },
  {
    id: 4,
    name: "Model 4",
    collection: collectionBeta,
    last_editor_common_name: "Bobby",
    last_edited_at: "2024-12-15T11:00:00.000Z",
  },
  {
    id: 5,
    name: "Model 5",
    collection: collectionBeta,
    last_editor_common_name: "Bobby",
    last_edited_at: "2024-12-14T22:00:00.000Z",
  },
  {
    id: 6,
    name: "Model 6",
    collection: collectionCharlie,
    last_editor_common_name: "Bobby",
    last_edited_at: "2024-12-14T12:00:00.000Z",
  },
  {
    id: 7,
    name: "Model 7",
    collection: collectionCharlie,
    last_editor_common_name: "Bobby",
    last_edited_at: "2024-12-10T12:00:00.000Z",
  },
  {
    id: 8,
    name: "Model 8",
    collection: collectionCharlie,
    last_editor_common_name: "Bobby",
    last_edited_at: "2024-11-15T12:00:00.000Z",
  },
  {
    id: 9,
    name: "Model 9",
    collection: collectionDelta,
    last_editor_common_name: "Bobby",
    last_edited_at: "2024-02-15T12:00:00.000Z",
  },
  {
    id: 10,
    name: "Model 10",
    collection: collectionDelta,
    last_editor_common_name: "Bobby",
    last_edited_at: "2023-12-15T12:00:00.000Z",
  },
  {
    id: 11,
    name: "Model 11",
    collection: collectionDelta,
    last_editor_common_name: "Bobby",
    last_edited_at: "2020-01-01T00:00:00.000Z",
  },
  {
    id: 12,
    name: "Model 12",
    collection: collectionZulu,
    last_editor_common_name: "Bobby",
    last_edited_at: "2000-01-01T00:00:00.000Z",
  },
  {
    id: 13,
    name: "Model 13",
    collection: collectionZulu,
    last_editor_common_name: "Bobby",
    last_edited_at: "2000-01-01T00:00:00.000Z",
  },
  {
    id: 14,
    name: "Model 14",
    collection: collectionZulu,
    last_editor_common_name: "Bobby",
    last_edited_at: "2000-01-01T00:00:00.000Z",
  },
  {
    id: 15,
    name: "Model 15",
    collection: collectionAngstrom,
    last_editor_common_name: "Bobby",
    last_edited_at: "2000-01-01T00:00:00.000Z",
  },
  {
    id: 16,
    name: "Model 16",
    collection: collectionAngstrom,
    last_editor_common_name: "Bobby",
    last_edited_at: "2000-01-01T00:00:00.000Z",
  },
  {
    id: 17,
    name: "Model 17",
    collection: collectionAngstrom,
    last_editor_common_name: "Bobby",
    last_edited_at: "2000-01-01T00:00:00.000Z",
  },
  {
    id: 18,
    name: "Model 18",
    collection: collectionOzgur,
    last_editor_common_name: "Bobby",
    last_edited_at: "2000-01-01T00:00:00.000Z",
  },
  {
    id: 19,
    name: "Model 19",
    collection: collectionOzgur,
    last_editor_common_name: "Bobby",
    last_edited_at: "2000-01-01T00:00:00.000Z",
  },
  {
    id: 20,
    name: "Model 20",
    collection: collectionOzgur,
    last_editor_common_name: "Bobby",
    last_edited_at: "2000-01-01T00:00:00.000Z",
  },
  {
    id: 21,
    name: "Model 20",
    collection: defaultRootCollection,
    last_editor_common_name: "Bobby",
    last_edited_at: "2000-01-01T00:00:00.000Z",
  },
  {
    id: 22,
    name: "Model 21",
    collection: defaultRootCollection,
    last_editor_common_name: "Bobby",
    last_edited_at: "2000-01-01T00:00:00.000Z",
  },
].map(model => createMockModelResult(model));

describe("Browse utils", () => {
  it("include a function that groups models by collection, sorting the collections alphabetically when English is the locale", () => {
    const groupedModels = groupModels(mockModels, "en-US");
    expect(groupedModels[0][0].collection.name).toEqual("Alpha");
    expect(groupedModels[0]).toHaveLength(3);
    expect(groupedModels[1][0].collection.name).toEqual("Ångström");
    expect(groupedModels[1]).toHaveLength(3);
    expect(groupedModels[2][0].collection.name).toEqual("Beta");
    expect(groupedModels[2]).toHaveLength(3);
    expect(groupedModels[3][0].collection.name).toEqual("Charlie");
    expect(groupedModels[3]).toHaveLength(3);
    expect(groupedModels[4][0].collection.name).toEqual("Delta");
    expect(groupedModels[4]).toHaveLength(3);
    expect(groupedModels[5][0].collection.name).toEqual("Our analytics");
    expect(groupedModels[5]).toHaveLength(2);
    expect(groupedModels[6][0].collection.name).toEqual("Özgür");
    expect(groupedModels[6]).toHaveLength(3);
    expect(groupedModels[7][0].collection.name).toEqual("Zulu");
    expect(groupedModels[7]).toHaveLength(3);
  });

  it("include a function that groups models by collection, sorting the collections alphabetically when Swedish is the locale", () => {
    const groupedModels = groupModels(mockModels, "sv-SV");
    expect(groupedModels[0][0].collection.name).toEqual("Alpha");
    expect(groupedModels[0]).toHaveLength(3);
    expect(groupedModels[1][0].collection.name).toEqual("Beta");
    expect(groupedModels[1]).toHaveLength(3);
    expect(groupedModels[2][0].collection.name).toEqual("Charlie");
    expect(groupedModels[2]).toHaveLength(3);
    expect(groupedModels[3][0].collection.name).toEqual("Delta");
    expect(groupedModels[3]).toHaveLength(3);
    expect(groupedModels[4][0].collection.name).toEqual("Our analytics");
    expect(groupedModels[4]).toHaveLength(2);
    expect(groupedModels[5][0].collection.name).toEqual("Zulu");
    expect(groupedModels[5]).toHaveLength(3);
    expect(groupedModels[6][0].collection.name).toEqual("Ångström");
    expect(groupedModels[6]).toHaveLength(3);
    expect(groupedModels[7][0].collection.name).toEqual("Özgür");
    expect(groupedModels[7]).toHaveLength(3);
  });

  const diverseModels = mockModels.map((model, index) => ({
    ...model,
    name: index % 2 === 0 ? `red ${index}` : `blue ${index}`,
    moderated_status: index % 3 === 0 ? `good ${index}` : `bad ${index}`,
  }));
  const availableModelFilters: AvailableModelFilters = {
    onlyRed: {
      predicate: (model: SearchResult) => model.name.startsWith("red"),
      activeByDefault: false,
    },
    onlyGood: {
      predicate: (model: SearchResult) =>
        Boolean(model.moderated_status?.startsWith("good")),
      activeByDefault: false,
    },
    onlyBig: {
      predicate: (model: SearchResult) =>
        Boolean(model.description?.startsWith("big")),
      activeByDefault: true,
    },
  };

  it("include a function that filters models, based on the object provided", () => {
    const onlyRedAndGood: ActualModelFilters = {
      onlyRed: true,
      onlyGood: true,
      onlyBig: false,
    };
    const onlyRedAndGoodModels = filterModels(
      diverseModels,
      onlyRedAndGood,
      availableModelFilters,
    );
    const everySixthModel = diverseModels.reduce<SearchResult[]>(
      (acc, model, index) => {
        return index % 6 === 0 ? [...acc, model] : acc;
      },
      [],
    );
    // Since every other model is red and every third model is good,
    // we expect every sixth model to be both red and good
    expect(onlyRedAndGoodModels).toEqual(everySixthModel);
  });

  it("filterModels does not filter out models if no filters are active", () => {
    const noActiveFilters: ActualModelFilters = {
      onlyRed: false,
      onlyGood: false,
      onlyBig: false,
    };
    const filteredModels = filterModels(
      diverseModels,
      noActiveFilters,
      availableModelFilters,
    );
    expect(filteredModels).toEqual(diverseModels);
  });
});
