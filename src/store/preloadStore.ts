import type { ComponentType } from 'react';

type WorldMapModule = {
  WorldMapDemo: ComponentType;
};

type ImportedWorldMapModule = {
  default: {
    WorldMapDemo: ComponentType;
  };
};

let preloadedWorldMap: WorldMapModule | null = null;

export const setPreloadedWorldMap = (module: ImportedWorldMapModule) => {
  console.log('Setting preloaded WorldMap with module:', module);
  if (module.default?.WorldMapDemo) {
    preloadedWorldMap = {
      WorldMapDemo: module.default.WorldMapDemo
    };
    console.log('Successfully stored WorldMapDemo component');
  } else {
    console.error('Module does not contain WorldMapDemo component:', module);
    preloadedWorldMap = null;
  }
};

export const getPreloadedWorldMap = () => {
  console.log('Getting preloaded WorldMap:', preloadedWorldMap);
  return preloadedWorldMap;
}; 