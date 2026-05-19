namespace AlzheimerAssist.Models
{
    public class AgendaDiaria
    {
        public int Id { get; private set; }

        public int VinculoId { get; private set; }

        public Vinculo Vinculo { get; private set; } = null!;

        public string Nome { get; private set; } = string.Empty;

        public bool Feito { get; private set; }

        protected AgendaDiaria()
        {
        }

        public AgendaDiaria(
            int vinculoId,
            Vinculo vinculo,
            string nome
        )
        {
            VinculoId = vinculoId;

            Vinculo = vinculo;

            Nome = nome;

            Feito = false;
        }

        public void MarcarComoFeito()
        {
            Feito = true;
        }

        public void MarcarComoNaoFeito()
        {
            Feito = false;
        }
    }
}