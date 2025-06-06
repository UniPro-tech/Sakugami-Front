"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CustomFieldForm() {
  const [name, setName] = useState("");
  const [type, setType] = useState("text");
  const [required, setRequired] = useState(false);
  const [options, setOptions] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("フィールド名を入力してください");
      return;
    }

    if (type === "select" && !options.trim()) {
      setError("オプションを入力してください");
      return;
    }

    const payload = {
      name,
      field_type: type,
      required,
      options: type === "select" ? options.split(",").map((o) => o.trim()) : undefined,
    };

    console.log("Create CustomField:", payload);
    // TODO: APIに送信
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md"
      noValidate
    >
      <div
        role="alert"
        aria-live="polite"
      >
        {error && (
          <p
            className="text-red-600 dark:text-red-400 mb-4"
            aria-label="エラーメッセージ"
          >
            {error}
          </p>
        )}
      </div>

      <div>
        <Label
          htmlFor="field-name"
          className="block mb-2 text-base"
        >
          フィールド名 {required && <span aria-label="必須">*</span>}
        </Label>
        <Input
          id="field-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-required="true"
          aria-invalid={error && !name ? "true" : "false"}
          className="w-full p-3 text-base"
        />
      </div>

      <div>
        <Label
          htmlFor="field-type"
          className="block mb-2 text-base"
        >
          フィールドタイプ {required && <span aria-label="必須">*</span>}
        </Label>
        <Select
          value={type}
          onValueChange={setType}
          aria-required="true"
        >
          <SelectTrigger
            id="field-type"
            className="w-full p-3 text-base"
          >
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">テキスト入力</SelectItem>
            <SelectItem value="number">数値入力</SelectItem>
            <SelectItem value="select">選択リスト</SelectItem>
            <SelectItem value="checkbox">チェックボックス</SelectItem>
            <SelectItem value="date">日付</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {type === "select" && (
        <div>
          <Label
            htmlFor="field-options"
            className="block mb-2 text-base"
          >
            {/* TODO: オプション欄をカンマ区切りではなくSlackのリストのように入力欄を増やす形式で対応する */}
            オプション（カンマ区切り） {required && <span aria-label="必須">*</span>}
          </Label>
          <Textarea
            id="field-options"
            placeholder="例: 高, 中, 低"
            value={options}
            onChange={(e) => setOptions(e.target.value)}
            aria-required="true"
            aria-invalid={error && !options ? "true" : "false"}
            className="w-full p-3 text-base min-h-[100px]"
          />
        </div>
      )}

      <div className="flex items-center space-x-3">
        <Checkbox
          id="required-field"
          checked={required}
          onCheckedChange={(checked) => setRequired(Boolean(checked))}
          aria-label="必須フィールドにする"
        />
        <Label
          htmlFor="required-field"
          className="text-base"
        >
          必須フィールドにする
        </Label>
      </div>

      <Button
        type="submit"
        className="w-full py-3 text-base font-medium"
        aria-label="カスタムフィールドを作成"
      >
        作成
      </Button>
    </form>
  );
}
