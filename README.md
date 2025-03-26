# Shared Components

This is a library to provide shared react components to my cockpit-plugins

# Adding and updating components

Components live in the `pkg/lib/shared` directory. You can add or update them there. They are then imported in the plugins using git fetch with a specific commit hash. This means, that you will need to push your changes, copy the hash associated with the commit and replace the hash found in the plugin Makefile under `SHARED_COMPONENT_REPO_COMMIT`.
When you then run make in the plugin again the components should be updated.