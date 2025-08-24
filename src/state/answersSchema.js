// E-002 answers schema and validation helpers

export const GOALS = ['Everyday polish','Work-smart casual','Trip','Capsule refresh','Special event']
export const VIBES = ['Minimal','Classic','Soft','Sporty','Edgy','Preppy','Relaxed Tailored']
export const NEUTRALS = ['Black','Charcoal-Grey','Navy','Stone-Beige','Cream-Ivory','Brown']
export const ACCENTS = ['Keep it neutral','Small accents okay','Color-curious']

export const answersSchema = {
  vibesMax: 2,
  neutralsMax: 2,
}

export function isStepValid(step, answers) {
  if (step === 1) return Boolean(answers.goal)
  if (step === 2) return answers.vibes.length >= 1 && answers.vibes.length <= answersSchema.vibesMax
  if (step === 3) return answers.neutrals.length >= 1 && answers.neutrals.length <= answersSchema.neutralsMax
  if (step === 4) return Boolean(answers.accent)
  return false
}


