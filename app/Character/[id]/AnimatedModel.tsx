"use client";

import React, { useMemo, useEffect, memo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { Group } from "three";

type Props = {
  modelPath: string; // geometry / skinned mesh GLB
  animPath: string; // GLB that contains animation clips only
  clip: "Idle" | "Talk" | "Sing";
};

function AnimatedModel({ modelPath, animPath, clip }: Props) {
  /* 1. load geometry & clips ------------------------------------------- */
  const { scene: modelScene } = useGLTF(modelPath);
  const { animations } = useGLTF(animPath);

  /* 2. clone so each viewer has its own skeleton ----------------------- */
  const clonedScene: Group = useMemo(
    () => SkeletonUtils.clone(modelScene) as Group,
    [modelScene]
  );

  /* 3. bind clips & cross-fade ----------------------------------------- */
  const { actions } = useAnimations(animations, clonedScene);

  useEffect(() => {
    if (!actions) return;
    Object.values(actions).forEach((a) => a?.fadeOut(0.2));
    actions[clip]?.reset().fadeIn(0.2).play();
  }, [clip, actions]);

  return <primitive object={clonedScene} dispose={null} />;
}

export default memo(AnimatedModel);
