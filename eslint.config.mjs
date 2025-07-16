import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Desactivar warnings de variables/imports no utilizados
      "@typescript-eslint/no-unused-vars": "off",
      
      // Permitir el uso de any (puedes ser más específico si quieres)
      "@typescript-eslint/no-explicit-any": "off",
      
      // Desactivar warning de <img> vs <Image>
      "@next/next/no-img-element": "off",
      
      // Desactivar warning de dependencias faltantes en useEffect
      "react-hooks/exhaustive-deps": "off",
    },
  },
];

export default eslintConfig;