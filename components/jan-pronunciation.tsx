"use client";

import { Volume2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

let janAudio: HTMLAudioElement | null = null;

function pickPreferredVoice(voices: SpeechSynthesisVoice[]) {
  const preferredNames = [
    "Google català",
    "Google català d'Espanya",
    "Microsoft",
    "Siri",
  ];

  const byName = voices.find((voice) =>
    preferredNames.some((name) =>
      voice.name.toLowerCase().includes(name.toLowerCase()),
    ),
  );

  if (byName) {
    return byName;
  }

  return (
    voices.find((voice) => voice.lang.toLowerCase().startsWith("ca")) ??
    null
  );
}

function playWithSpeechSynthesis() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }

  // Catalan-style "Jan" with a clear final "n" (non-French, non-nasal).
  const utterance = new SpeechSynthesisUtterance("Jan");
  utterance.lang = "ca-ES";
  utterance.rate = 0.95;
  utterance.pitch = 1;

  const voice = pickPreferredVoice(window.speechSynthesis.getVoices());
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  }

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function playJanPronunciation() {
  if (typeof window === "undefined") {
    return;
  }

  if (!janAudio) {
    janAudio = new Audio("/audio/jan-catala.m4a");
    janAudio.preload = "auto";
  }

  janAudio.currentTime = 0;
  void janAudio.play().catch(() => {
    playWithSpeechSynthesis();
  });
}

export function JanPronunciation() {
  return (
    <span className="inline-flex items-center gap-1.5 align-baseline">
      <span>Jan</span>
      <Tooltip>
        <TooltipTrigger
          aria-label="Play pronunciation for Jan"
          onClick={playJanPronunciation}
          className="inline-flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Volume2 className="size-3.5" />
        </TooltipTrigger>
        <TooltipContent>Play pronunciation (Català)</TooltipContent>
      </Tooltip>
    </span>
  );
}
