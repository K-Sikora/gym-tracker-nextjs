import prisma from "../../connection";

const exercises = [
  { exercise_name: "Push-ups", muscle_group: "Chest" },
  { exercise_name: "Lunges", muscle_group: "Legs" },
  { exercise_name: "Dumbbell Bench Press", muscle_group: "Chest" },
  { exercise_name: "Dumbbell Shoulder Press", muscle_group: "Shoulders" },
  { exercise_name: "Barbell Deadlift", muscle_group: "Back" },
  { exercise_name: "Barbell Bench Press", muscle_group: "Chest" },
  { exercise_name: "Barbell Rows", muscle_group: "Back" },
  { exercise_name: "Dumbbell Curls", muscle_group: "Arms" },
  { exercise_name: "Tricep Dips", muscle_group: "Arms" },
  { exercise_name: "Shoulder Lateral Raises", muscle_group: "Shoulders" },
  { exercise_name: "Leg Press", muscle_group: "Legs" },
  { exercise_name: "Romanian Deadlift", muscle_group: "Legs" },
  { exercise_name: "Incline Dumbbell Press", muscle_group: "Chest" },
  { exercise_name: "Pull-ups", muscle_group: "Back" },
  { exercise_name: "Hamstring Curls", muscle_group: "Legs" },
  { exercise_name: "Chest Flyes", muscle_group: "Chest" },
  { exercise_name: "Seated Cable Rows", muscle_group: "Back" },
  { exercise_name: "Barbell Overhead Press", muscle_group: "Shoulders" },
  { exercise_name: "Barbell Lunges", muscle_group: "Legs" },
  { exercise_name: "Incline Bench Press", muscle_group: "Chest" },
  { exercise_name: "Lat Pulldowns", muscle_group: "Back" },
  { exercise_name: "Dumbbell Shoulder Flyes", muscle_group: "Shoulders" },
  { exercise_name: "Leg Curls", muscle_group: "Legs" },
  { exercise_name: "Hammer Curls", muscle_group: "Arms" },
  { exercise_name: "Skull Crushers", muscle_group: "Arms" },
  { exercise_name: "Dumbbell Rows", muscle_group: "Back" },
  { exercise_name: "Arnold Press", muscle_group: "Shoulders" },
  { exercise_name: "Step-ups", muscle_group: "Legs" },
  { exercise_name: "Dumbbell Pullovers", muscle_group: "Chest" },
  { exercise_name: "Squat", muscle_group: "Legs" },
  { exercise_name: "Bench Press", muscle_group: "Chest" },
  { exercise_name: "Deadlift", muscle_group: "Back" },
  { exercise_name: "Pull-ups", muscle_group: "Back" },
  { exercise_name: "Military Press", muscle_group: "Shoulders" },
  { exercise_name: "Barbell Row", muscle_group: "Back" },
  { exercise_name: "Dumbbell Lateral Raise", muscle_group: "Shoulders" },
  { exercise_name: "Leg Extensions", muscle_group: "Legs" },
  { exercise_name: "Dumbbell Bicep Curls", muscle_group: "Arms" },
  { exercise_name: "Plank", muscle_group: "Core" },
];
export default async function hello(req, res) {
  try {
    for (const exercise of exercises) {
      await prisma.ExerciseList.create({
        data: exercise,
      });
    }

    console.log("Added popular exercises to the WorkoutList table");
  } catch (err) {
    console.log(err);
  }
}
