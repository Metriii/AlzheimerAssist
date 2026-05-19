namespace AlzheimerAssist.Models
{
    public class Vinculo
    {
        public int Id { get; private set; }

        public int PacienteId { get; private set; }

        public Paciente Paciente { get; private set; } = null!;

        public int CuidadorId { get; private set; }

        public Cuidador Cuidador { get; private set; } = null!;

        protected Vinculo()
        {
        }

        public Vinculo(
            int pacienteId,
            Paciente paciente,
            int cuidadorId,
            Cuidador cuidador
        )
        {
            PacienteId = pacienteId;

            Paciente = paciente;

            CuidadorId = cuidadorId;

            Cuidador = cuidador;
        }
    }
}