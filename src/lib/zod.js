import {z, ZodIssueCode} from "zod";

z.setErrorMap((issue, ctx) => {
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      switch (issue.received) {
        case "undefined":
          return {message: "必須です"};
        default:
          return {message: `有効な形式でありません`};
      }

    case ZodIssueCode.too_small:
    case ZodIssueCode.too_big:
      const minOrMax = issue.code === ZodIssueCode.too_small ? "min" : "max";
      const limit = issue.minimum ?? issue.maximum; // issue.minimum または issue.maximum
      const isInclusive = issue.inclusive; // 境界値を含むか (true/false)
      
      switch (issue.type) {
        case "string":
          if (issue.code === ZodIssueCode.too_small && limit === 1) 
            return {message: "必須です"};
          else
            return {message: `${limit}文字${minOrMax === "min" ? "以上" : "以下"}で入力してください`};
        case "number":
          if (issue.code === ZodIssueCode.too_small && limit === 0) {
            if (isInclusive) 
              // min(0) の場合
              return {message: "0以上の数を入力してください"};
            else 
              // positive() の場合 (min(0) with exclusive)
              return {message: "0より大きい数を入力してください"};
          } 
          else {
            return {message: `${limit}${isInclusive ? "以上" : "より大きい"}${minOrMax === "最大" ? "以下" : "未満"}の数を入力してください`};
          }
        case "array":
          return {message: `${limit}個${minOrMax === "min" ? "以上" : "以下"}の項目を追加してください`};
        default:
          return {message: ctx.defaultError}; // その他のtoo_small/too_bigエラー
      }

    case ZodIssueCode.invalid_string:
      // validation プロパティで具体的な検証タイプを特定
      switch (issue.validation) {
        case "email":
          return {message: "有効なメールアドレスを入力してください"};
        case "url":
          return {message: "有効なURLを入力してください"};
        case "uuid":
          return {message: "有効なUUID形式で入力してください"};
        case "datetime":
          return {message: "有効な日時形式で入力してください"};
        case "ip":
          return {message: "有効なIPアドレスを入力してください"};
        default:
          return {message: "不正な形式の文字列です"};
      }
    
    case ZodIssueCode.not_int: // int型の判定エラー
    return {message: "整数を入力してください"};

    case ZodIssueCode.invalid_enum_value:
      // issue.options には許可された値の配列が含まれる
      return {message: `選択できる値は ${issue.options.map(o => `'${String(o)}'`).join(', ')} のいずれかです`};

    case ZodIssueCode.custom:
      // refine や superRefine で設定されたカスタムエラーメッセージをそのまま使用
      return {message:  issue.message || "予期せぬバリデーションエラーが発生しました"};

    case ZodIssueCode.invalid_literal:
      return {message:  `'${String(issue.expected)}' の値を入力してください`};

    case ZodIssueCode.unrecognized_keys:
      return {message: `認識できないキーが含まれています: ${issue.keys.map(k => `'${k}'`).join(', ')}`};

    case ZodIssueCode.invalid_union:
    case ZodIssueCode.invalid_union_discriminator:
      return {message: "いずれかの有効な形式で入力してください"};
      
    // その他のZodIssueCodeはデフォルトメッセージを使用
    default:
      return {message: ctx.defaultError};
  }
});

export default z
