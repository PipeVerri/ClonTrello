import type React from "react";

export type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

export type Update<T> = {
	[K in keyof T]: { param: K; value: T[K] };
}[keyof T];
