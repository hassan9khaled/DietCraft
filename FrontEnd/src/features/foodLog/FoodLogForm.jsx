/* eslint-disable react/prop-types */
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { FiPlusCircle } from "react-icons/fi";
import useAddFood from "./useAddFood";
import InputField from "../../ui/InputField";
import SelectField from "../../ui/SelectField";
import SpinnerMini from "../../ui/SpinnerMini";

function FoodLogForm({ setOverlay, email }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mealName: "",
      mealType: "Breakfast",
      calories: 0,
      carb: 0,
      protein: 0,
      fat: 0,
    },
  });

  const handleNumberChange = useCallback(
    (field) => (e) => {
      const value = Math.max(0, Number(e.target.value));
      setValue(field, value);
    },
    [setValue]
  );

  const { addFoodFn, isPending } = useAddFood();

  const onSubmit = (data) => {
    addFoodFn({ ...data, mealId: Date.now().toString(), email });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto space-y-6 max-w-8xl"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InputField
          id="mealName"
          label="Food Name"
          type="text"
          placeholder="Enter food name"
          register={register}
          validation={{
            required: "Food name is required",
            pattern: {
              value: /^[a-zA-Z\s]+$/,
              message: "Only letters and spaces are allowed",
            },
          }}
          error={errors.mealName}
        />

        {/* Meal Type */}
        <div>
          <SelectField
            id="mealType"
            label="Meal Type"
            options={[
              { value: "Breakfast", label: "Breakfast" },
              { value: "Lunch", label: "Lunch" },
              { value: "Dinner", label: "Dinner" },
              { value: "Snack", label: "Snack" },
            ]}
            register={register}
            validation={{ required: "Meal type is required" }}
            error={errors.mealType}
          />
        </div>
        {/* Nutrients */}
        {["calories", "carb", "protein", "fat"].map((field) => (
          <div key={field}>
            <InputField
              id={field}
              label={field.charAt(0).toUpperCase() + field.slice(1) + " (g)"}
              type="number"
              register={register}
              validation={{
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: `${field} cannot be negative`,
                },
              }}
              onChange={handleNumberChange(field)}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col-reverse flex-wrap justify-between gap-4 lg:flex-row">
        <div className="flex flex-wrap justify-between gap-4 max-sm:w-full">
          <button
            type="submit"
            className="flex items-center justify-center w-full h-11 gap-2 p-3 text-white transition-transform transform bg-green-600 rounded-lg sm:w-48 hover:bg-green-700"
          >
            {isPending ? (
              <SpinnerMini />
            ) : (
              <>
                <FiPlusCircle size={18} /> Add Food
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setOverlay(true)}
            className="flex items-center justify-center w-full h-11 gap-2 p-3 text-white transition-transform transform bg-blue-600 rounded-lg sm:w-48 hover:bg-blue-700"
          >
            <FiPlusCircle size={18} /> Add Ingredients
          </button>
        </div>
      </div>
    </form>
  );
}

export default FoodLogForm;
