import {useState} from 'react';

type Error = [string, string];

const useErrors = (): [
  Map<string, string>,
  (errors: Error[]) => void,
  (errors: string[]) => void
] => {
  const [localErrors, setLocalErrors] = useState<Map<string, string>>(
    new Map(),
  );

  const setErrors = (errors: Error[]) => {
    let copyErrors: Map<string, string> = new Map(localErrors);

    errors.forEach(([key, value]: Error) => {
      copyErrors.set(key, value);
    });

    setLocalErrors(copyErrors);
  };

  const clearErrors = (errors: string[]) => {
    const copyErrors = new Map(localErrors);

    errors.forEach((error: string) => {
      copyErrors.delete(error);
    });

    setLocalErrors(copyErrors);
  };

  return [localErrors, setErrors, clearErrors];
};

export default useErrors;
