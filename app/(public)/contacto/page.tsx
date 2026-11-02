
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

const email = "edmilsonantoniooficial@gmail.com";

export default function ContactoPage() {
  return (
    <AppShell>
      <div className="py-16 md:py-24">

        {/* Introdução centrada */}
        <section className="mx-auto max-w-3xl py-10 text-center md:py-16">
          <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary">
            Contacto
          </span>

          <h1 className="mt-7 text-4xl font-bold tracking-tight md:text-6xl animate-fade-up">
            Estamos aqui para te ouvir.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg animate-fade-up [animation-delay:200ms]">
            Tens uma dúvida, uma sugestão ou queres partilhar uma ideia?
            Gostávamos de saber a tua opinião sobre o PT Rental Map.
          </p>
        </section>

        {/* Contacto principal */}
        <section className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-surface px-6 py-10 text-center md:px-12 md:py-14">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </div>

              <p className="mt-7 text-sm font-medium text-muted-foreground">
                Envia-nos uma mensagem
              </p>

              <p className="mt-3 break-all text-lg font-semibold md:text-2xl">
                {email}
              </p>

              <a
                href={`mailto:${email}?subject=${encodeURIComponent("Contacto — PT Rental Map")}`}
                className="mt-8 inline-flex items-center justify-center gap-3 rounded-xl bg-primary px-7 py-4 text-sm font-semibold text-background transition-all duration-300 hover:-translate-y-1 hover:opacity-90"
              >
                Enviar email
                <span aria-hidden="true">↗</span>
              </a>

              <p className="mt-5 text-xs text-muted-foreground">
                O botão abre a tua aplicação de email com o destinatário
                já preenchido.
              </p>
            </div>
          </div>
        </section>

        {/* Motivos de contacto */}
        <section className="mx-auto mt-20 max-w-4xl">
          <h2 className="text-center text-2xl font-semibold">
            Em que podemos ajudar?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-center leading-7 text-muted-foreground">
            Podes utilizar este contacto para diferentes assuntos
            relacionados com o projeto.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-lg text-primary">
                ✦
              </div>
              <h3 className="mt-4 font-semibold">
                Sugestões
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Partilha ideias e funcionalidades que gostarias de ver
                na plataforma.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-lg text-primary">
                ⌕
              </div>
              <h3 className="mt-4 font-semibold">
                Correções
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Comunica erros ou informações que consideres
                necessário rever.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-lg text-primary">
                ♡
              </div>
              <h3 className="mt-4 font-semibold">
                Colaboração
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Contacta-nos para questões ou oportunidades de colaboração.
              </p>
            </div>
          </div>
        </section>

        {/* Ligação ao projeto */}
        <section className="mt-20 border-t border-border pt-10 text-center">
          <h2 className="text-lg font-semibold">
            Ainda não conheces o projeto?
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Descobre a missão e os objetivos do PT Rental Map.
          </p>

          <Link
            href="/sobre"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:opacity-80"
          >
            Conhecer o projeto
            <span aria-hidden="true">→</span>
          </Link>
        </section>
      </div>
    </AppShell>
  );
}
