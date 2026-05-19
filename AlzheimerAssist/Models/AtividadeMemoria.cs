namespace AlzheimerAssist.Models
{
    public class AtividadeMemoria
    {
        public int Id { get; private set; }

        public int PacienteId { get; private set; }

        public Paciente Paciente { get; private set; } = null!;

        public bool AtividadeAnimal { get; private set; }

        public bool JogoMemoria { get; private set; }

        public bool QuebraCabeca { get; private set; }

        public bool AtividadeAssociacao { get; private set; }

        public DateTime HorarioRealizado { get; private set; }

        protected AtividadeMemoria()
        {
        }

        public AtividadeMemoria(
            int pacienteId,
            Paciente paciente,
            bool atividadeAnimal,
            bool jogoMemoria,
            bool quebraCabeca,
            bool atividadeAssociacao
        )
        {
            PacienteId = pacienteId;

            Paciente = paciente;

            AtividadeAnimal = atividadeAnimal;

            JogoMemoria = jogoMemoria;

            QuebraCabeca = quebraCabeca;

            AtividadeAssociacao = atividadeAssociacao;

            HorarioRealizado = DateTime.UtcNow;
        }
    }
}