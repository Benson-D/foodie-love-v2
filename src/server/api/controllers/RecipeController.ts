
export default class RecipeController {
	public static formatMeasurements(measurements: { description: string}[]): { value: string; label: string}[] {
		const formatMeasurements = measurements
		.map(({ description }) => {
			return { value: description, label: description };
		})
		.filter(({ value }) => value !== "")
		.sort((a, b) => a.value.localeCompare(b.value));

		return [{ value: "", label: "none" }, ...formatMeasurements];
	}
}