type JSONValue = string | number | null | { [prop: string]: JSONValue } | JSONValue[];
export type JSONObject = { [prop: string]: JSONValue };

export default JSONValue;