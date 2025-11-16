"use client";

import { useState, useEffect } from "react";
import { 
  Dumbbell, 
  TrendingUp, 
  Award, 
  Calendar,
  CheckCircle2,
  Flame,
  Activity,
  Target,
  ArrowRight,
  Play,
  Users,
  Star,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export default function ViralShowcase() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stats, setStats] = useState({
    weight: 95,
    muscle: 15,
    workouts: 0,
    streak: 0
  });

  // Timeline de evolução do usuário fictício "Carlos"
  const timeline = [
    {
      week: 0,
      title: "Dia 1 - O Começo",
      description: "Carlos, 32 anos, decidiu mudar de vida",
      weight: 95,
      muscle: 15,
      workouts: 0,
      streak: 0,
      mood: "😰",
      quote: "Estou cansado de me sentir assim...",
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop"
    },
    {
      week: 2,
      title: "Semana 2 - Primeiros Passos",
      description: "Completou o quiz e começou o treino personalizado",
      weight: 93,
      muscle: 16,
      workouts: 6,
      streak: 6,
      mood: "😊",
      quote: "O app me guia em cada exercício!",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop"
    },
    {
      week: 4,
      title: "Semana 4 - Ganhando Ritmo",
      description: "Treinos viraram hábito, energia aumentou",
      weight: 91,
      muscle: 18,
      workouts: 16,
      streak: 12,
      mood: "💪",
      quote: "Não consigo mais viver sem treinar!",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=400&fit=crop"
    },
    {
      week: 8,
      title: "Semana 8 - Transformação Visível",
      description: "Amigos começaram a notar a mudança",
      weight: 87,
      muscle: 22,
      workouts: 32,
      streak: 28,
      mood: "🔥",
      quote: "As pessoas perguntam qual é meu segredo!",
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop"
    },
    {
      week: 12,
      title: "Semana 12 - Nova Vida",
      description: "Objetivo alcançado e superado!",
      weight: 82,
      muscle: 28,
      workouts: 48,
      streak: 45,
      mood: "🏆",
      quote: "TREYNORO mudou minha vida completamente!",
      image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400&h=400&fit=crop"
    }
  ];

  // Auto-play da timeline
  useEffect(() => {
    if (isPlaying && currentWeek < timeline.length - 1) {
      const timer = setTimeout(() => {
        setCurrentWeek(prev => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    } else if (currentWeek >= timeline.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentWeek, timeline.length]);

  // Atualizar stats baseado na semana atual
  useEffect(() => {
    const current = timeline[currentWeek];
    setStats({
      weight: current.weight,
      muscle: current.muscle,
      workouts: current.workouts,
      streak: current.streak
    });
  }, [currentWeek, timeline]);

  const handlePlayPause = () => {
    if (currentWeek >= timeline.length - 1) {
      setCurrentWeek(0);
    }
    setIsPlaying(!isPlaying);
  };

  const currentData = timeline[currentWeek];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50" />
        
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 px-4 sm:px-6 py-2 text-sm sm:text-base">
              <Zap className="w-4 h-4 mr-2" />
              HISTÓRIA VIRAL
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6">
              A Transformação de
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                Carlos
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              De sedentário a atleta em 12 semanas com TREYNORO
            </p>
          </div>

          {/* Video-like Timeline Player */}
          <Card className="border-4 border-emerald-500/30 shadow-2xl bg-gray-900/80 backdrop-blur-sm max-w-5xl mx-auto">
            <CardContent className="p-4 sm:p-8">
              {/* Main Display */}
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                {/* Image/Avatar */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-2 border-emerald-500/30">
                  <img 
                    src={currentData.image}
                    alt={currentData.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-6xl sm:text-7xl mb-2">{currentData.mood}</div>
                    <Badge className="bg-emerald-500/90 text-white border-0 text-sm sm:text-base">
                      Semana {timeline[currentWeek].week}
                    </Badge>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                      {currentData.title}
                    </h2>
                    <p className="text-base sm:text-lg text-gray-300 mb-4">
                      {currentData.description}
                    </p>
                    <div className="p-4 bg-emerald-500/10 border-l-4 border-emerald-500 rounded-r-lg">
                      <p className="text-base sm:text-lg italic text-emerald-300">
                        "{currentData.quote}"
                      </p>
                    </div>
                  </div>

                  {/* Progress Stats */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="p-4 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl border border-red-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-5 h-5 text-red-400" />
                        <span className="text-sm text-gray-300">Peso</span>
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold text-white">
                        {stats.weight}kg
                      </p>
                      <p className="text-xs sm:text-sm text-red-400">
                        {stats.weight < 95 ? `↓ ${95 - stats.weight}kg` : "Inicial"}
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl border border-emerald-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Dumbbell className="w-5 h-5 text-emerald-400" />
                        <span className="text-sm text-gray-300">Músculo</span>
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold text-white">
                        {stats.muscle}%
                      </p>
                      <p className="text-xs sm:text-sm text-emerald-400">
                        {stats.muscle > 15 ? `↑ ${stats.muscle - 15}%` : "Inicial"}
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-xl border border-orange-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-orange-400" />
                        <span className="text-sm text-gray-300">Treinos</span>
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold text-white">
                        {stats.workouts}
                      </p>
                      <p className="text-xs sm:text-sm text-orange-400">
                        Completados
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Flame className="w-5 h-5 text-purple-400" />
                        <span className="text-sm text-gray-300">Sequência</span>
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold text-white">
                        {stats.streak}
                      </p>
                      <p className="text-xs sm:text-sm text-purple-400">
                        Dias seguidos
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Progress */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Semana {timeline[currentWeek].week}</span>
                  <span>Semana 12</span>
                </div>
                <Progress 
                  value={(currentWeek / (timeline.length - 1)) * 100} 
                  className="h-3 bg-gray-800"
                />
                
                {/* Timeline Dots */}
                <div className="flex justify-between">
                  {timeline.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentWeek(idx)}
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                        idx === currentWeek
                          ? "bg-emerald-500 scale-150"
                          : idx < currentWeek
                          ? "bg-emerald-600"
                          : "bg-gray-700"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
                <Button
                  onClick={handlePlayPause}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-base sm:text-lg py-6 gap-2"
                >
                  <Play className={`w-5 h-5 ${isPlaying ? "animate-pulse" : ""}`} />
                  {isPlaying ? "Assistindo..." : currentWeek >= timeline.length - 1 ? "Ver Novamente" : "Assistir Transformação"}
                </Button>
                <Link href="/" className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 text-base sm:text-lg py-6 gap-2"
                  >
                    <Target className="w-5 h-5" />
                    Começar Minha Jornada
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Social Proof */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            <Card className="bg-gray-900/80 backdrop-blur-sm border-emerald-500/30">
              <CardContent className="p-6 text-center">
                <Users className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400 mx-auto mb-3" />
                <p className="text-3xl sm:text-4xl font-bold text-white mb-2">50K+</p>
                <p className="text-sm sm:text-base text-gray-400">Usuários Transformados</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/80 backdrop-blur-sm border-orange-500/30">
              <CardContent className="p-6 text-center">
                <Star className="w-10 h-10 sm:w-12 sm:h-12 text-orange-400 mx-auto mb-3" />
                <p className="text-3xl sm:text-4xl font-bold text-white mb-2">4.9/5</p>
                <p className="text-sm sm:text-base text-gray-400">Avaliação Média</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/80 backdrop-blur-sm border-purple-500/30">
              <CardContent className="p-6 text-center">
                <Award className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400 mx-auto mb-3" />
                <p className="text-3xl sm:text-4xl font-bold text-white mb-2">1M+</p>
                <p className="text-sm sm:text-base text-gray-400">Treinos Completados</p>
              </CardContent>
            </Card>
          </div>

          {/* Testimonials */}
          <div className="mt-12 sm:mt-16 max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
              Outras Histórias de Sucesso
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  name: "Maria Silva",
                  result: "Perdeu 15kg em 3 meses",
                  quote: "Nunca pensei que seria tão fácil!",
                  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop"
                },
                {
                  name: "João Santos",
                  result: "Ganhou 8kg de massa muscular",
                  quote: "O app é meu personal trainer!",
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop"
                },
                {
                  name: "Ana Costa",
                  result: "Melhorou resistência em 200%",
                  quote: "Agora corro 10km sem parar!",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
                }
              ].map((testimonial, idx) => (
                <Card key={idx} className="bg-gray-900/80 backdrop-blur-sm border-emerald-500/30 hover:border-emerald-500 transition-all duration-300">
                  <CardContent className="p-6">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-4 border-4 border-emerald-500"
                    />
                    <h3 className="text-lg sm:text-xl font-bold text-white text-center mb-2">
                      {testimonial.name}
                    </h3>
                    <Badge className="w-full justify-center mb-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      {testimonial.result}
                    </Badge>
                    <p className="text-sm sm:text-base text-gray-300 text-center italic">
                      "{testimonial.quote}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Final */}
          <div className="mt-12 sm:mt-20 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Pronto para Sua Transformação?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de pessoas que já mudaram suas vidas com TREYNORO
            </p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-lg sm:text-xl px-8 sm:px-12 py-6 sm:py-8 gap-3 shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300">
                Começar Agora Grátis
                <ArrowRight className="w-6 h-6" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
