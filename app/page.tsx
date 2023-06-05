"use client";

import React, { useState } from "react";
import { DotCanvas } from "./dotcanvas";
import { StepDefinition, Stepper, ImagePicker, BrushSelector } from "./stepper";

export default function DotGenerator() {
  const [templateImage, setTemplateImage] = useState<string | null>(null);
  const [brushUrl, setBrushUrl] = useState<string | null>(null);
  const [stepsComplete, setStepsComplete] = useState<boolean>(false);

  const steps: Array<StepDefinition> = [
    {
      title: "first",
      renderContents: (active, setCanComplete) => (
        <ImagePicker
          handleFileSelect={setTemplateImage}
          setCanComplete={setCanComplete}
          active={active}
        />
      ),
    },
    {
      title: "second",
      renderContents: (active, setCanComplete) => (
        <BrushSelector
          handleSelectBrush={(brush) => setBrushUrl(brush)}
          setCanComplete={setCanComplete}
          active={active}
        />
      ),
    },
  ];

  return (
    <main className="flex min-h-screen flex-row items-center p-24">
      <div className="basis-1/3">
        <Stepper
          steps={steps}
          direction="horizontal"
          initialIndex={0}
          setStepsComplete={setStepsComplete}
        />
      </div>
      <div className="basis-2/3">
        <DotCanvas
          templateImage={templateImage}
          configComplete={stepsComplete}
          brushUrl={brushUrl}
        />
      </div>
    </main>
  );
}
