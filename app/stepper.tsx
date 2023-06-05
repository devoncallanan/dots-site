import Image from "next/image";
import React, { useState } from "react";

export interface StepDefinition {
  title: string;
  contents: JSX.Element;
}

interface StepperProps {
  steps: Array<StepDefinition>;
  direction: "horizontal" | "vertical";
  initialIndex: number;
}

export function Stepper(props: StepperProps) {
  const [activeStep, setActiveStep] = useState<number>(props.initialIndex);

  const completeStep = (index: number): void => {
    if (index !== activeStep) {
      console.log("ooops, something got goofed in the stepper");
    } else if (index === props.steps.length) {
      // completed stepper logic
    } else {
      setActiveStep(index + 1);
    }
  };

  return (
    <div className="m-10 space-y-4">
      {props.steps.map((stepDef, index) => (
        <Step
          key={index}
          index={index}
          title={stepDef.title}
          contents={stepDef.contents}
          active={index === activeStep}
          handleComplete={completeStep}
        />
      ))}
    </div>
  );
}

interface StepProps {
  index: number;
  title: string;
  contents: JSX.Element;
  active: boolean;
  handleComplete: (index: number) => void;
}
function Step(props: StepProps) {
  return (
    <div
      className={
        "flex rounded-md border-solid border-2 border-indigo-600 items-stretch p-4 " +
        (props.active ? "scale-125 " : "opacity-50 ")
      }
    >
      <div className="grow">{props.contents}</div>
      <div>
        <button
          className={
            "rounded-full border-solid border-4 \
         bg-green-500 hover:bg-green-700 text-white \
         font-bold py-2 px-4"
          }
          title="Next"
          onClick={() => props.handleComplete(props.index)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

interface ImagePickerProps {
  handleFileSelect: (file: string | null) => void;
}

export function ImagePicker(props: ImagePickerProps) {
  const [inputValue, setInputValue] = useState("");

  // read file and resolve to base64 string for use in application
  const handleFileSelect = (file?: File): void => {
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        // convert image file to base64 string, type narrow since reader can load other objects
        if (typeof reader.result === "string") {
          props.handleFileSelect(reader.result);
        }
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/png, image/jpeg"
        className="file:rounded-full"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          handleFileSelect(e.target.files?.[0]);
        }}
      />
    </>
  );
}

interface BrushSelectorProps {
  handleSelectBrush: (brush: string) => void;
}
export function BrushSelector(props: BrushSelectorProps) {
  const [currentBrush, setCurrentBrush] = useState<string>();
  const brushOptions = ["/brushes/hank_brush.png", "/brushes/Logo-Bolt.png"];

  const handleSelectBrush = (e: any) => {
    // Get just the brush option substring
    const src: string = e.target.src;
    const brushOptionString = src.substring(src.indexOf("/brushes/"));
    setCurrentBrush(brushOptionString);
    props.handleSelectBrush(brushOptionString);
  };
  return (
    <>
      <div>Choose a brush</div>
      <div className="flex flex-row space-x-1">
        {brushOptions.map((option, index) => (
          <div key={index}>
            <Image
              className={
                "rounded-full " +
                (currentBrush === option ? "border-solid border-4 border-black" : "")
              }
              src={option}
              alt={"cat brush"}
              width={25}
              height={25}
              onClick={(e) => {
                handleSelectBrush(e);
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
}
