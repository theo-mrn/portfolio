'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { setPreloadedWorldMap } from '@/store/preloadStore';
import type { ComponentType } from 'react';

type ImportedWorldMapModule = {
  default: {
    WorldMapDemo: ComponentType;
  };
};

export function PreloadResources() {
  const pathname = usePathname();
  const isPreloading = useRef(false);

  useEffect(() => {
    // Précharger uniquement si nous ne sommes pas déjà sur la page cyber
    if (!pathname.includes('/cyber')) {
      // Précharger le composant WorldMapDemo
      const preloadWorldMap = () => {
        // Éviter les préchargements multiples simultanés
        if (isPreloading.current) {
          return;
        }

        isPreloading.current = true;
        console.log('Starting WorldMap preload...');

        import('@/components/sections/cyber/World')
          .then((mod: ImportedWorldMapModule) => {
            console.log('WorldMap module loaded:', mod);
            if (typeof mod.default?.WorldMapDemo === 'function') {
              setPreloadedWorldMap(mod);
            } else {
              console.error('WorldMapDemo not found in module:', mod);
            }
          })
          .catch(err => {
            console.error('Failed to preload WorldMap:', err);
          })
          .finally(() => {
            isPreloading.current = false;
          });
      };

      // Précharger immédiatement
      preloadWorldMap();

      // Précharger à nouveau si l'utilisateur survole un lien vers la page cyber
      const handleLinkHover = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const closestLink = target.closest('a');
        if (closestLink?.href?.includes('/cyber')) {
          preloadWorldMap();
        }
      };

      document.addEventListener('mouseover', handleLinkHover);

      return () => {
        document.removeEventListener('mouseover', handleLinkHover);
      };
    } else {
      console.log('Already on cyber page, skipping preload');
    }
  }, [pathname]);

  return null;
} 