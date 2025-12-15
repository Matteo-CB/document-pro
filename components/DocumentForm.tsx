"use client";

import {
  DocumentType,
  DocumentFields,
  DocumentField,
  FieldType,
} from "@/lib/types";
import { useDocument } from "@/context/DocumentContext";
import {
  Calendar,
  Hash,
  Image as ImageIcon,
  Pencil,
  AlignLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ChangeEvent } from "react";

interface DocumentFormProps {
  documentType: DocumentType;
}

const FieldIconMap: Record<FieldType, React.ElementType> = {
  text: Pencil,
  textarea: AlignLeft,
  number: Hash,
  date: Calendar,
  select: Pencil,
  color: Pencil,
  image: ImageIcon,
  separator: "div",
};

export default function DocumentForm({ documentType }: DocumentFormProps) {
  const { state, dispatch } = useDocument();
  const fields = DocumentFields[documentType] || [];

  const handleDataChange = (id: string, value: any) => {
    dispatch({ type: "UPDATE_DATA", payload: { field: id, value } });
  };

  const renderField = (field: DocumentField) => {
    const Icon = FieldIconMap[field.type];
    const value = state.data[field.id] || "";

    if (field.type === "separator") {
      return (
        <div key={field.id} className="border-t border-gray-200 my-6"></div>
      );
    }

    const baseClass =
      "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 text-sm";

    let inputElement;

    switch (field.type) {
      case "textarea":
        inputElement = (
          <textarea
            id={field.id}
            rows={4}
            value={value}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              handleDataChange(field.id, e.target.value)
            }
            placeholder={field.placeholder}
            required={field.required}
            className={baseClass}
          />
        );
        break;
      case "select":
        inputElement = (
          <select
            id={field.id}
            value={value}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              handleDataChange(field.id, e.target.value)
            }
            required={field.required}
            className={cn(baseClass, "appearance-none bg-white")}
          >
            <option value="">Sélectionner...</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
        break;
      case "number":
        inputElement = (
          <input
            type="number"
            id={field.id}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleDataChange(field.id, parseFloat(e.target.value))
            }
            placeholder={field.placeholder}
            required={field.required}
            className={baseClass}
          />
        );
        break;
      case "date":
        inputElement = (
          <input
            type="date"
            id={field.id}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleDataChange(field.id, e.target.value)
            }
            required={field.required}
            className={cn(baseClass, "appearance-none bg-white")}
          />
        );
        break;
      case "color":
        inputElement = (
          <input
            type="color"
            id={field.id}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleDataChange(field.id, e.target.value)
            }
            required={field.required}
            className="w-12 h-12 rounded-lg cursor-pointer p-0 border border-gray-300"
            style={{ padding: 0 }}
          />
        );
        break;
      case "text":
      default:
        inputElement = (
          <input
            type="text"
            id={field.id}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleDataChange(field.id, e.target.value)
            }
            placeholder={field.placeholder}
            required={field.required}
            className={baseClass}
          />
        );
        break;
    }

    return (
      <div key={field.id} className="mb-5">
        <label
          htmlFor={field.id}
          className="font-medium text-sm text-secondary mb-1 flex items-center"
        >
          <Icon className="w-4 h-4 mr-2 text-primary" />
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {inputElement}
      </div>
    );
  };

  const groupedFields = fields.reduce((acc, field) => {
    const section = field.section || "Général";
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(field);
    return acc;
  }, {} as Record<string, DocumentField[]>);

  return (
    <form className="space-y-6 bg-surface p-6 rounded-xl shadow-lg border border-gray-100">
      {Object.entries(groupedFields).map(([section, fields]) => (
        <div key={section} className="pt-4">
          <h3 className="text-xl font-semibold text-primary mb-4 border-b border-primary/20 pb-1">
            {section}
          </h3>
          {fields.map(renderField)}
        </div>
      ))}
    </form>
  );
}
