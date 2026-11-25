import { useEffect, useRef } from 'react';
import { mountBuilding } from './buildingScene';

export default function BuildingCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    try {
      return mountBuilding(ref.current);
    } catch {
      // WebGL unavailable: the hero still works without the model
      return undefined;
    }
  }, []);
  return <div ref={ref} className="absolute inset-0" aria-hidden="true" />;
}
