import { useTranslationContext } from "../context/TranslationContext";
import defaultTranslations from "../../translations/en.json";
import { keyofDeep } from "../types/translations";

const getNestedValue = (
    obj: Record<string, unknown>,
    path: string,
): string | undefined => {
    return path
        .split(".")
        .reduce<unknown>(
            (acc, part) =>
                acc &&
                typeof acc === "object" &&
                acc !== null &&
                (acc as Record<string, unknown>)[part] !== undefined
                    ? (acc as Record<string, unknown>)[part]
                    : undefined,
            obj,
        ) as string | undefined;
};

export const useTranslation = () => {
    const contextTranslations = useTranslationContext();

    const t = (key: keyofDeep<typeof defaultTranslations>): string => {
        return (
            getNestedValue(contextTranslations, key) ??
            getNestedValue(defaultTranslations, key) ??
            key
        );
    };

    return t;
};
