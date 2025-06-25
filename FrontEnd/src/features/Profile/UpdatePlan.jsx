import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTarget } from "../../context/TargetContext";
import usePlan from "../DietRecommendation/usePlan";
import useUser from "../auth/useUser";
import useEditPlan from "../DietRecommendation/useEditPlan";
import useCreateTarget from "../DietRecommendation/useCreateTarget";
import SpinnerMini from "../../ui/SpinnerMini";

function UpdatePlan() {
  const { user } = useUser();
  const email = user?.email || "";
  const { editPlan, isEditing } = useEditPlan(email);
  const { getNutritions } = useTarget();
  const { plan } = usePlan(email);
  const { targetFn } = useCreateTarget(email);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (plan && plan[0]) {
      reset({
        weight: plan[0].weight || 0,
        height: plan[0].height || 0,
        activity: plan[0].activity || "",
        age: plan[0].age || 0,
        gender: plan[0].gender || "",
        plan: plan[0].plan + " " + plan[0].rate || "",
      });
    }
  }, [plan, reset]);

  const onSubmit = async (data) => {
    const rate = data?.plan?.split(" ");
    const nutrationsGuest = {
      ...data,
      height: Number(data.height),
      weight: Number(data.weight),
      age: Number(data.age),
      rate: rate[1],
      plan: rate[0],
    };
    editPlan(nutrationsGuest);
    const nutrations = await getNutritions(nutrationsGuest);
    if (nutrations) {
      targetFn({ email, targetData: nutrations });
    }
  };
  return (
    <div className="p-4 sm:p-8 mx-auto bg-white rounded-lg shadow-md max-w-8xl mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Update Your Plan
      </h2>
      <p className="text-gray-600 mb-4">
        Update your weight, height, age, and preferences to get personalized
        recommendations.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Weight */}
        <div>
          <label className="block text-gray-700 mb-1">Weight (kg)</label>
          <input
            type="number"
            {...register("weight", { required: "Weight is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {errors.weight && (
            <p className="text-red-600 text-sm mt-1">{errors.weight.message}</p>
          )}
        </div>

        {/* Height */}
        <div>
          <label className="block text-gray-700 mb-1">Height (cm)</label>
          <input
            type="number"
            {...register("height", { required: "Height is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {errors.height && (
            <p className="text-red-600 text-sm mt-1">{errors.height.message}</p>
          )}
        </div>

        {/* Activity */}
        <div>
          <label className="block text-gray-700 mb-1">Activity Level</label>
          <select
            {...register("activity", {
              required: "Activity level is required",
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="" disabled>
              Select Activity Level
            </option>
            <option value="sedentary">Sedentary</option>
            <option value="lightlyActive">Lightly Active</option>
            <option value="moderateActivity">Moderately Active</option>
            <option value="active">Active</option>
            <option value="veryActive">Very Active & Physical Job</option>
          </select>
          {errors.activity && (
            <p className="text-red-600 text-sm mt-1">
              {errors.activity.message}
            </p>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="block text-gray-700 mb-1">Age</label>
          <input
            type="number"
            {...register("age", { required: "Age is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {errors.age && (
            <p className="text-red-600 text-sm mt-1">{errors.age.message}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-gray-700 mb-1">Gender</label>
          <select
            {...register("gender", { required: "Gender is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <p className="text-red-600 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

        {/* Weight Loss Plan */}
        <div>
          <label className="block text-gray-700 mb-1">Weight Loss Plan</label>
          <select
            {...register("plan", { required: "Plan is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="" disabled>
              Choose a Plan
            </option>
            <option value="gain 0.5">Gain Weight</option>
            <option value="gain 1">Extreme Gain Weight</option>
            <option value="maintain 0">Maintain</option>
            <option value="loss 0.5">Weight Loss</option>
            <option value="loss 1">Extreme Weight Loss</option>
          </select>
          {errors.plan && (
            <p className="text-red-600 text-sm mt-1">{errors.plan.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isEditing}
          className="sm:w-40 h-10 w-full px-4 py-2 text-white bg-dietcraft-500 hover:bg-dietcraft-700 rounded-lg flex items-center justify-center transition-colors disabled:cursor-not-allowed"
        >
          {isEditing ? <SpinnerMini /> : "Update Plan"}
        </button>
      </form>
    </div>
  );
}

export default UpdatePlan;
