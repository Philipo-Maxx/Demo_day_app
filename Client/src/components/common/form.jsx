import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectTrigger } from "../ui/select";
import { SelectContent, SelectValue, SelectItem } from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) => {
  const renderInputsByComponentType = (getControlItem) => {
    let element = null;
    let value = formData[getControlItem.name] || "";
    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            className={`bg-accent font-body text-2xl`}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

        break;
      case "select":
        element = (
          <Select
            // disabled={imageLoadingState}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );

        break;

      case "radiogroup":
        element = (
          <RadioGroup
            defaultValue={getControlItem.options[0]}
            value={value}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
          >
            <div className="flex text-white">
              {getControlItem.options.map((item) => (
                <div key={item} className="flex items-center space-x-2 mr-2">
                  <RadioGroupItem value={item} id={item} />
                  <Label htmlFor={item}>{item}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        );

        break;
      case "textarea":
        element = (
          <Textarea
            // disabled={imageLoadingState}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

        break;
      default:
        element = (
          <Input
            className=""
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1 text-yellow-400 font-body tracking-wide font-extrabold">
              {controlItem.label}
            </Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button
        disabled={isBtnDisabled}
        type="submit"
        className="mt-10 w-full bg-white text-[#080B28] font-body text-lg font-extrabold hover:text-black transition ease-in duration-300 hover:bg-gradient-to-r from-yellow-400 to-white/5 focus:outline-none ring ring-yellow-300 hover:ring-0"
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
