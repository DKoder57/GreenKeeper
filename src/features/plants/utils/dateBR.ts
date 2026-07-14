// src/features/plants/utils/dateBR.ts

/**
 * Aplica máscara DD/MM/AAAA enquanto o usuário digita.
 * Aceita apenas dígitos e insere as barras automaticamente.
 */
export function maskDateBR(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

/**
 * Valida uma data no formato DD/MM/AAAA e retorna um ISO string (UTC midnight)
 * se válida, ou null caso contrário. Verifica também datas inexistentes
 * (ex: 31/02) e datas futuras.
 */
export function parseDateBR(value: string): { iso: string } | { error: string } {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (!match) {
    return { error: "Use o formato DD/MM/AAAA" };
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  const date = new Date(year, month - 1, day);
  const isRealDate =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;

  if (!isRealDate) {
    return { error: "Data inválida" };
  }

  const today = new Date();
  today.setHours(23, 59, 59, 999);
  if (date > today) {
    return { error: "A data não pode ser futura" };
  }

  return { iso: date.toISOString() };
}

/**
 * Converte um ISO string armazenado no banco para DD/MM/AAAA,
 * usado para pré-preencher o formulário de edição.
 */
export function formatDateBR(iso: string): string {
  const date = new Date(iso);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}