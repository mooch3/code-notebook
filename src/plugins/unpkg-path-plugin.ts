import * as esbuild from 'esbuild-wasm';
 
export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
        // figure out where index.js is stored
        // filter controls when onLoad and onResolve functions are executed
        // namespace can apply functions to some files that are only in namespace 'a'
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args);
        return { path: args.path, namespace: 'a' };
      });
    // onLoad listener attempts to load up index.js file
    // if you define onLoad callback inside plugin you override ESBuilds 
    // process of trying to access the file system (which would be hard drive... which throws an error)
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);
        // load object below if index.js
        // repeat resolve step to fnd where import file is
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import message from 'tiny-test-pkg';
              console.log(message);
            `,
          };
        }
      });
    },
  };
};