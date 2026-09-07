import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Benicio",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "jio3xvjs",
  dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  plugins: [structureTool()],
  document: {
    actions: (previousActions, context) => {
      if (context.schemaType !== "journalPost") return previousActions;

      // Keep Sanity's native delete action (including its permission checks and
      // confirmation dialog), but surface it beside the primary blog actions.
      const deleteAction = previousActions.find(
        (action) => action.action === "delete",
      );
      if (!deleteAction) return previousActions;

      const otherActions = previousActions.filter(
        (action) => action.action !== "delete",
      );
      return [otherActions[0], deleteAction, ...otherActions.slice(1)].filter(
        Boolean,
      );
    },
  },
  schema: {
    types: schemaTypes,
  },
});
