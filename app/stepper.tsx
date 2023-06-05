import Image from "next/image";
import React, { useEffect, useState } from "react";

export interface StepDefinition {
  title: string;
  renderContents: (active: boolean, setCanComplete: (canComplete: boolean) => void) => JSX.Element;
}

interface StepperProps {
  steps: Array<StepDefinition>;
  direction: "horizontal" | "vertical";
  initialIndex: number;
  setStepsComplete: (complete: boolean) => void;
}

export function Stepper(props: StepperProps) {
  const [activeStep, setActiveStep] = useState<number>(props.initialIndex);

  const completeStep = (index: number): void => {
    if (index !== activeStep) {
      console.log("ooops, something got goofed in the stepper");
    } else {
      setActiveStep(index + 1);
    }
    // Notify that the stepper has been completed
    if (index + 1 === props.steps.length) {
      props.setStepsComplete(true);
    }
  };

  return (
    <div className="grid justify-items-center">
      <div className="row-auto m-10 space-y-4">
        {props.steps.map((stepDef, index) => (
          <Step
            key={index}
            index={index}
            stepDef={stepDef}
            active={index === activeStep}
            handleComplete={completeStep}
          />
        ))}
      </div>
      <div
        className="row-auto rounded-full border-solid border-4 bg-purple-500 \
       hover:bg-purple-700 text-white font-bold py-2 px-4"
      >
        <button
          onClick={() => {
            // Reset the stepper state and notify stepper is incomplete
            setActiveStep(0);
            props.setStepsComplete(false);
          }}
        >
          Try again!
        </button>
      </div>
    </div>
  );
}

interface StepProps {
  index: number;
  stepDef: StepDefinition;
  active: boolean;
  handleComplete: (index: number) => void;
}
function Step(props: StepProps) {
  const [canComplete, setCanComplete] = useState<boolean>(false);

  return (
    <div
      className={
        "flex rounded-md border-solid border-2 border-indigo-600 items-stretch p-4 " +
        (props.active ? "scale-125 " : "opacity-50 ")
      }
    >
      <div className="grow">{props.stepDef.renderContents(props.active, setCanComplete)}</div>
      <div>
        <button
          className={
            "rounded-full border-solid border-4 \
         bg-green-500 hover:bg-green-700 text-white \
         font-bold py-2 px-4 disabled:opacity-75"
          }
          disabled={!canComplete}
          title="Next"
          onClick={() => props.handleComplete(props.index)}
        >
          Next
        </button>
      </div>
    </div>
  );
}


// Definte components that can be used as step contents

interface StepContentsProps {
  active: boolean;
  setCanComplete: (canComplete: boolean) => void;
}

interface ImagePickerProps extends StepContentsProps {
  handleFileSelect: (file: string | null) => void;
}

export function ImagePicker(props: ImagePickerProps) {
  const [inputValue, setInputValue] = useState("");

  // Validate step completeness
  useEffect(() => {
    if (inputValue) {
      props.setCanComplete(true);
    } else {
      props.setCanComplete(false);
    }
  }, [inputValue]);

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
      <div>Choose an image</div>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/png, image/jpeg"
        className="file:rounded-full"
        disabled={!props.active}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          handleFileSelect(e.target.files?.[0]);
        }}
      />
    </>
  );
}

interface BrushSelectorProps extends StepContentsProps {
  handleSelectBrush: (brush: string) => void;
}
export function BrushSelector(props: BrushSelectorProps) {
  const [currentBrush, setCurrentBrush] = useState<string>("");
  const brushOptions = [
    "/brushes/hank_brush.png",
    "/brushes/Logo-Bolt.png",
    "/brushes/overview_logo.jpg",
  ];

  // Validate step completeness
  useEffect(() => {
    // falsy check on brush selection
    if (currentBrush) {
      props.setCanComplete(true);
    } else {
      props.setCanComplete(false);
    }
  }, [currentBrush]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                if (props.active) {
                  handleSelectBrush(e);
                }
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
}
