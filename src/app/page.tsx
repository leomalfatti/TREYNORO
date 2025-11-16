"use client";

import { useState, useEffect } from "react";
import { 
  Dumbbell, 
  Target, 
  TrendingUp, 
  Award, 
  Calendar,
  CheckCircle2,
  ChevronRight,
  Apple,
  Flame,
  Activity,
  Clock,
  RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Types
interface QuizAnswers {
  goal: string;
  level: string;
  frequency: string;
  equipment: string;
  focus: string;
}

interface WorkoutExercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  tips: string;
}

interface Workout {
  day: string;
  focus: string;
  exercises: WorkoutExercise[];
}

interface ProgressEntry {
  date: string;
  completed: boolean;
  workout: string;
}

// Quiz Component
function Quiz({ onComplete }: { onComplete: (answers: QuizAnswers) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});

  const questions = [
    {
      id: "goal",
      question: "Qual é o seu principal objetivo?",
      options: [
        { value: "perda_peso", label: "Perda de Peso", icon: Flame },
        { value: "ganho_massa", label: "Ganho de Massa Muscular", icon: Dumbbell },
        { value: "resistencia", label: "Melhorar Resistência", icon: Activity },
        { value: "tonificar", label: "Tonificar o Corpo", icon: Target },
      ],
    },
    {
      id: "level",
      question: "Qual é o seu nível de experiência?",
      options: [
        { value: "iniciante", label: "Iniciante", icon: Target },
        { value: "intermediario", label: "Intermediário", icon: TrendingUp },
        { value: "avancado", label: "Avançado", icon: Award },
      ],
    },
    {
      id: "frequency",
      question: "Quantas vezes por semana você pode treinar?",
      options: [
        { value: "3", label: "3 vezes", icon: Calendar },
        { value: "4", label: "4 vezes", icon: Calendar },
        { value: "5", label: "5 vezes", icon: Calendar },
        { value: "6", label: "6 vezes", icon: Calendar },
      ],
    },
    {
      id: "equipment",
      question: "Que equipamentos você tem acesso?",
      options: [
        { value: "casa", label: "Treino em Casa (sem equipamento)", icon: Target },
        { value: "basico", label: "Equipamento Básico (halteres, faixas)", icon: Dumbbell },
        { value: "academia", label: "Academia Completa", icon: Award },
      ],
    },
    {
      id: "focus",
      question: "Qual área você quer focar mais?",
      options: [
        { value: "corpo_todo", label: "Corpo Todo", icon: Activity },
        { value: "superior", label: "Parte Superior", icon: Dumbbell },
        { value: "inferior", label: "Parte Inferior", icon: TrendingUp },
        { value: "core", label: "Core/Abdômen", icon: Target },
      ],
    },
  ];

  const currentQuestion = questions[step];

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(newAnswers as QuizAnswers);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full mb-4 sm:mb-6">
            <Dumbbell className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            TREYNORO
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Responda algumas perguntas para criar seu treino ideal
          </p>
        </div>

        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-700">
              Pergunta {step + 1} de {questions.length}
            </span>
            <span className="text-sm font-medium text-emerald-600">
              {Math.round(((step + 1) / questions.length) * 100)}%
            </span>
          </div>
          <Progress value={((step + 1) / questions.length) * 100} className="h-2" />
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl text-gray-900">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {currentQuestion.options.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className="group relative p-4 sm:p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all duration-300 text-left"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center group-hover:from-emerald-500 group-hover:to-teal-600 transition-all duration-300">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300">
                          {option.label}
                        </h3>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-colors duration-300" />
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {step > 0 && (
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="gap-2"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Voltar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Workout Plan Component
function WorkoutPlan({ 
  answers, 
  onReset 
}: { 
  answers: QuizAnswers; 
  onReset: () => void;
}) {
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("workout-progress");
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  const saveProgress = (newProgress: ProgressEntry[]) => {
    setProgress(newProgress);
    localStorage.setItem("workout-progress", JSON.stringify(newProgress));
  };

  const generateWorkouts = (): Workout[] => {
    const { goal, level, frequency, equipment, focus } = answers;
    const days = parseInt(frequency);

    // Base exercises by equipment
    const exercisesByEquipment = {
      casa: {
        superior: ["Flexões", "Flexões Diamante", "Mergulhos em Cadeira", "Prancha Lateral"],
        inferior: ["Agachamento", "Afundo", "Agachamento Búlgaro", "Elevação de Panturrilha"],
        core: ["Prancha", "Abdominal Bicicleta", "Mountain Climbers", "Russian Twist"],
        cardio: ["Burpees", "Jumping Jacks", "High Knees", "Polichinelos"],
      },
      basico: {
        superior: ["Rosca Direta", "Rosca Martelo", "Desenvolvimento com Halteres", "Crucifixo"],
        inferior: ["Agachamento com Halteres", "Stiff", "Afundo com Halteres", "Glúteo com Faixa"],
        core: ["Prancha com Peso", "Abdominal com Peso", "Oblíquo com Halter", "Dead Bug"],
        cardio: ["Burpees", "Mountain Climbers", "Jump Squats", "Box Steps"],
      },
      academia: {
        superior: ["Supino Reto", "Puxada Frontal", "Desenvolvimento", "Rosca Direta", "Tríceps Pulley"],
        inferior: ["Agachamento Livre", "Leg Press", "Mesa Flexora", "Cadeira Extensora", "Panturrilha"],
        core: ["Abdominal na Máquina", "Prancha", "Elevação de Pernas", "Cable Crunch"],
        cardio: ["Esteira", "Elíptico", "Bicicleta", "Remo"],
      },
    };

    const exercises = exercisesByEquipment[equipment as keyof typeof exercisesByEquipment];

    // Adjust intensity by level
    const intensityMap = {
      iniciante: { sets: "3", reps: "10-12", rest: "60-90s" },
      intermediario: { sets: "4", reps: "8-12", rest: "45-60s" },
      avancado: { sets: "4-5", reps: "6-10", rest: "30-45s" },
    };

    const intensity = intensityMap[level as keyof typeof intensityMap];

    // Generate workout plan
    const workouts: Workout[] = [];

    if (days === 3) {
      workouts.push(
        {
          day: "Dia 1",
          focus: "Corpo Superior",
          exercises: exercises.superior.slice(0, 5).map(name => ({
            name,
            sets: intensity.sets,
            reps: intensity.reps,
            rest: intensity.rest,
            tips: "Mantenha a forma correta e controle o movimento",
          })),
        },
        {
          day: "Dia 2",
          focus: "Corpo Inferior + Core",
          exercises: [
            ...exercises.inferior.slice(0, 4).map(name => ({
              name,
              sets: intensity.sets,
              reps: intensity.reps,
              rest: intensity.rest,
              tips: "Foque na amplitude completa do movimento",
            })),
            ...exercises.core.slice(0, 2).map(name => ({
              name,
              sets: intensity.sets,
              reps: intensity.reps,
              rest: intensity.rest,
              tips: "Mantenha o core contraído durante todo exercício",
            })),
          ],
        },
        {
          day: "Dia 3",
          focus: "Corpo Todo + Cardio",
          exercises: [
            ...exercises.superior.slice(0, 2).map(name => ({
              name,
              sets: intensity.sets,
              reps: intensity.reps,
              rest: intensity.rest,
              tips: "Combine força e resistência",
            })),
            ...exercises.inferior.slice(0, 2).map(name => ({
              name,
              sets: intensity.sets,
              reps: intensity.reps,
              rest: intensity.rest,
              tips: "Mantenha ritmo constante",
            })),
            ...exercises.cardio.slice(0, 2).map(name => ({
              name,
              sets: "3",
              reps: "30-45s",
              rest: "30s",
              tips: "Alta intensidade para queimar calorias",
            })),
          ],
        }
      );
    } else if (days === 4) {
      workouts.push(
        {
          day: "Dia 1",
          focus: "Peito + Tríceps",
          exercises: exercises.superior.slice(0, 5).map(name => ({
            name,
            sets: intensity.sets,
            reps: intensity.reps,
            rest: intensity.rest,
            tips: "Foque na contração muscular",
          })),
        },
        {
          day: "Dia 2",
          focus: "Costas + Bíceps",
          exercises: exercises.superior.slice(0, 5).map(name => ({
            name,
            sets: intensity.sets,
            reps: intensity.reps,
            rest: intensity.rest,
            tips: "Puxe com as costas, não com os braços",
          })),
        },
        {
          day: "Dia 3",
          focus: "Pernas Completo",
          exercises: exercises.inferior.map(name => ({
            name,
            sets: intensity.sets,
            reps: intensity.reps,
            rest: intensity.rest,
            tips: "Dia mais intenso da semana",
          })),
        },
        {
          day: "Dia 4",
          focus: "Ombros + Core",
          exercises: [
            ...exercises.superior.slice(0, 3).map(name => ({
              name,
              sets: intensity.sets,
              reps: intensity.reps,
              rest: intensity.rest,
              tips: "Movimentos controlados",
            })),
            ...exercises.core.map(name => ({
              name,
              sets: intensity.sets,
              reps: intensity.reps,
              rest: intensity.rest,
              tips: "Core forte = melhor performance",
            })),
          ],
        }
      );
    } else {
      // 5 or 6 days
      workouts.push(
        {
          day: "Dia 1",
          focus: "Peito",
          exercises: exercises.superior.slice(0, 5).map(name => ({
            name,
            sets: intensity.sets,
            reps: intensity.reps,
            rest: intensity.rest,
            tips: "Volume alto para hipertrofia",
          })),
        },
        {
          day: "Dia 2",
          focus: "Costas",
          exercises: exercises.superior.slice(0, 5).map(name => ({
            name,
            sets: intensity.sets,
            reps: intensity.reps,
            rest: intensity.rest,
            tips: "Foque na amplitude",
          })),
        },
        {
          day: "Dia 3",
          focus: "Pernas",
          exercises: exercises.inferior.map(name => ({
            name,
            sets: intensity.sets,
            reps: intensity.reps,
            rest: intensity.rest,
            tips: "Não pule o dia de pernas!",
          })),
        },
        {
          day: "Dia 4",
          focus: "Ombros + Trapézio",
          exercises: exercises.superior.slice(0, 5).map(name => ({
            name,
            sets: intensity.sets,
            reps: intensity.reps,
            rest: intensity.rest,
            tips: "Ombros fortes = melhor postura",
          })),
        },
        {
          day: "Dia 5",
          focus: "Braços + Core",
          exercises: [
            ...exercises.superior.slice(0, 3).map(name => ({
              name,
              sets: intensity.sets,
              reps: intensity.reps,
              rest: intensity.rest,
              tips: "Bíceps e tríceps equilibrados",
            })),
            ...exercises.core.map(name => ({
              name,
              sets: intensity.sets,
              reps: intensity.reps,
              rest: intensity.rest,
              tips: "Finalize com core forte",
            })),
          ],
        }
      );

      if (days === 6) {
        workouts.push({
          day: "Dia 6",
          focus: "Cardio + Mobilidade",
          exercises: exercises.cardio.map(name => ({
            name,
            sets: "4",
            reps: "45-60s",
            rest: "30s",
            tips: "Recuperação ativa",
          })),
        });
      }
    }

    return workouts;
  };

  const workouts = generateWorkouts();

  const markAsComplete = (workoutDay: string) => {
    const today = new Date().toISOString().split("T")[0];
    const newEntry: ProgressEntry = {
      date: today,
      completed: true,
      workout: workoutDay,
    };
    saveProgress([...progress, newEntry]);
  };

  const completedThisWeek = progress.filter(p => {
    const entryDate = new Date(p.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return entryDate >= weekAgo;
  }).length;

  const nutritionTips = {
    perda_peso: [
      "Mantenha um déficit calórico de 300-500 calorias por dia",
      "Priorize proteínas magras (frango, peixe, ovos)",
      "Beba pelo menos 2-3 litros de água por dia",
      "Evite alimentos processados e açúcares refinados",
    ],
    ganho_massa: [
      "Consuma 1.6-2.2g de proteína por kg de peso corporal",
      "Mantenha superávit calórico de 300-500 calorias",
      "Faça 5-6 refeições por dia",
      "Inclua carboidratos complexos (batata doce, arroz integral)",
    ],
    resistencia: [
      "Carboidratos são essenciais para energia (60% da dieta)",
      "Hidrate-se antes, durante e após o treino",
      "Consuma frutas para energia rápida",
      "Inclua gorduras saudáveis (abacate, castanhas)",
    ],
    tonificar: [
      "Equilibre proteínas, carboidratos e gorduras saudáveis",
      "Coma a cada 3-4 horas para manter metabolismo ativo",
      "Priorize alimentos integrais e naturais",
      "Evite dietas muito restritivas",
    ],
  };

  const tips = nutritionTips[answers.goal as keyof typeof nutritionTips];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full mb-4 sm:mb-6">
            <Award className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            TREYNORO
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-4">
            Seu plano de treino personalizado
          </p>
          <Button
            variant="outline"
            onClick={onReset}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Refazer Quiz
          </Button>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 sm:mb-8">
          <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-500 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Esta Semana</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {completedThisWeek}/{answers.frequency}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-500 rounded-full flex items-center justify-center">
                  <Flame className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Sequência</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {completedThisWeek} dias
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-teal-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Total</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {progress.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="workouts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 h-auto p-1">
            <TabsTrigger value="workouts" className="gap-2 py-3">
              <Dumbbell className="w-4 h-4" />
              <span className="hidden sm:inline">Treinos</span>
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="gap-2 py-3">
              <Apple className="w-4 h-4" />
              <span className="hidden sm:inline">Nutrição</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workouts" className="space-y-6">
            {/* Workout Days Navigation */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {workouts.map((workout, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDay(index)}
                  className={`flex-shrink-0 px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    selectedDay === index
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                      : "bg-white border-2 border-gray-200 text-gray-700 hover:border-emerald-300"
                  }`}
                >
                  {workout.day}
                </button>
              ))}
            </div>

            {/* Selected Workout */}
            <Card className="border-2 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <CardTitle className="text-2xl sm:text-3xl mb-2">
                      {workouts[selectedDay].day}
                    </CardTitle>
                    <CardDescription className="text-emerald-50 text-base">
                      Foco: {workouts[selectedDay].focus}
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => markAsComplete(workouts[selectedDay].day)}
                    className="bg-white text-emerald-600 hover:bg-emerald-50 gap-2 w-full sm:w-auto"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Marcar como Completo
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  {workouts[selectedDay].exercises.map((exercise, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 hover:border-emerald-300 transition-all duration-300"
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg">
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                            {exercise.name}
                          </h3>
                          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-3">
                            <div className="flex items-center gap-2">
                              <Activity className="w-4 h-4 text-emerald-600" />
                              <div>
                                <p className="text-xs text-gray-500">Séries</p>
                                <p className="text-sm sm:text-base font-semibold text-gray-900">
                                  {exercise.sets}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-orange-600" />
                              <div>
                                <p className="text-xs text-gray-500">Reps</p>
                                <p className="text-sm sm:text-base font-semibold text-gray-900">
                                  {exercise.reps}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-teal-600" />
                              <div>
                                <p className="text-xs text-gray-500">Descanso</p>
                                <p className="text-sm sm:text-base font-semibold text-gray-900">
                                  {exercise.rest}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <Target className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <p className="text-xs sm:text-sm text-blue-900">
                              {exercise.tips}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-6">
            <Card className="border-2 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl sm:text-3xl flex items-center gap-3">
                  <Apple className="w-7 h-7 sm:w-8 sm:h-8" />
                  Dicas de Nutrição
                </CardTitle>
                <CardDescription className="text-orange-50 text-base">
                  Alimentação ideal para seu objetivo
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-4">
                  {tips.map((tip, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200"
                    >
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <p className="text-sm sm:text-base text-gray-800 leading-relaxed pt-1">
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border-2 border-emerald-200">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                    <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                    Dica Extra
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    A consistência é mais importante que a perfeição. Foque em fazer escolhas
                    saudáveis na maior parte do tempo, mas permita-se flexibilidade ocasional.
                    Lembre-se: resultados vêm com o tempo e dedicação!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Main App Component
export default function Home() {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("quiz-answers");
    if (saved) {
      const parsedAnswers = JSON.parse(saved);
      setAnswers(parsedAnswers);
      setQuizCompleted(true);
    }
  }, []);

  const handleQuizComplete = (quizAnswers: QuizAnswers) => {
    setAnswers(quizAnswers);
    setQuizCompleted(true);
    localStorage.setItem("quiz-answers", JSON.stringify(quizAnswers));
  };

  const handleReset = () => {
    setQuizCompleted(false);
    setAnswers(null);
    localStorage.removeItem("quiz-answers");
    localStorage.removeItem("workout-progress");
  };

  if (!quizCompleted || !answers) {
    return <Quiz onComplete={handleQuizComplete} />;
  }

  return <WorkoutPlan answers={answers} onReset={handleReset} />;
}
