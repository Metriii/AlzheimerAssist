namespace AlzheimerAssist.Models
{
    public class AgendaAnual
    {
        public int Id { get; private set; }

        public int VinculoId { get; private set; }

        public Vinculo Vinculo { get; private set; } = null!;

        public string Titulo { get; private set; } = string.Empty;

        public DateOnly Data { get; private set; }

        protected AgendaAnual()
        {
        }

        public AgendaAnual(
            int vinculoId,
            Vinculo vinculo,
            string titulo,
            DateOnly data
        )
        {
            VinculoId = vinculoId;

            Vinculo = vinculo;

            Titulo = titulo;

            Data = data;
        }
    }
}