import Image from "next/image";
import React, { useState } from "react";

export interface DotConfig {
  templateImage: string;
  brushUrl: string;
}

interface ConfigFormProps {
  onSetTemplate: (templateBase64: string) => void;
  onSetBrush: (brushUrl: string) => void;
}

/* Configuration form used to collect user inputs for image to dots conversion
 *
 */
export function ConfigForm(props: ConfigFormProps) {
  const [activeBrush, setActiveBrush] = useState<string>("");
  const brushOptions = [
    "/brushes/hank_brush.png",
    "/brushes/Logo-Bolt.png",
    "/brushes/overview_logo.jpg",
  ];

  // read file and resolve to base64 string for use in application
  const handleFileSelect = (file?: File): void => {
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        // convert image file to base64 string, type narrow since reader can load other objects
        if (typeof reader.result === "string") {
          props.onSetTemplate(reader.result);
        }
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid row-auto m-12 space-y-8">
      <div className="space-y-2">
        <div className="font-bold whitespace-normal">
        Choose an image
        </div>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/png, image/jpeg"
          className="ml-4 border rounded border-solid \ 
                    border-neutral-300 file:border-solid file:bg-neutral-100"
          onChange={(e) => {
            handleFileSelect(e.target.files?.[0]);
          }}
        />
        <div className="ml-4 text-xs italic whitespace-normal">
        More contrast works better, ~1mb limit
        </div>
      </div>
      <div className="space-y-2">
        <div className="font-bold">Choose a brush</div>
        <div className="ml-4 flex flex-row space-x-1">
          {brushOptions.map((option, index) => (
            <div key={index}>
              <Image
                className={
                  "rounded-full " +
                (activeBrush === option ? "border-solid border-4 border-black" : "")
                }
                src={option}
                alt={"cat brush"}
                width={50}
                height={50}
                onClick={(e) => {
                  const src = e.currentTarget.src;
                  setActiveBrush(src.substring(src.indexOf("/brushes/")));
                  props.onSetBrush(src.substring(src.indexOf("/brushes/")));
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}