import { usePlane } from "@react-three/cannon";
import { RepeatWrapping, NearestFilter } from "three";
import { groundTexture } from "../images/textures";
import { useStore } from "../hooks/useStore";

// Ground component
export const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0],
  }));

  const [addCube] = useStore((state) => [state.addCube]);

  //   make the ground texture repeat 100 times in both directions
  groundTexture.repeat.set(100, 100);

  return (
    <mesh
      onClick={(e) => {
        e.stopPropagation();
        const [x, y, z] = e.point.toArray().map((p) => Math.ceil(p));
        addCube(x, y, z);
      }}
      ref={ref}
    >
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
};
