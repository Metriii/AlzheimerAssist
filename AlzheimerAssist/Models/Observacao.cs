namespace AlzheimerAssist.Models
{
    public class Observacao
    {
        public int Id { get; private set; }

        public int VinculoId { get; private set; }

        public Vinculo Vinculo { get; private set; } = null!;

        public string Descricao { get; private set; } = string.Empty;

        protected Observacao()
        {
        }

        public Observacao(
            int vinculoId,
            Vinculo vinculo,
            string descricao
        )
        {
            VinculoId = vinculoId;

            Vinculo = vinculo;

            Descricao = descricao;
        }
    }
}