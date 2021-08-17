type JSONValue = string | number | null | { [prop: string]: JSONValue } | JSONValue[];

export default JSONValue;