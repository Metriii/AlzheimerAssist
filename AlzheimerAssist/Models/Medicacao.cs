namespace AlzheimerAssist.Models
{
    public class Medicacao
    {
        public int Id { get; private set; }

        public int PacienteId { get; private set; }

        public Paciente Paciente { get; private set; } = null!;

        public string Nome { get; private set; } = string.Empty;

        public TimeOnly Horario { get; private set; }

        public bool Tomado { get; private set; }

        protected Medicacao()
        {
        }

        public Medicacao(
            int pacienteId,
            Paciente paciente,
            string nome,
            TimeOnly horario
        )
        {
            PacienteId = pacienteId;

            Paciente = paciente;

            Nome = nome;

            Horario = horario;

            Tomado = false;
        }

        public void MarcarComoTomado()
        {
            Tomado = true;
        }

        public void MarcarComoNaoTomado()
        {
            Tomado = false;
        }
    }
}