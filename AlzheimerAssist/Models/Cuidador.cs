namespace AlzheimerAssist.Models
{
    public class Cuidador : Usuario
    {
        protected Cuidador()
        {
        }

        public Cuidador(
            string nome,
            string email,
            string senha,
            string cpf
        ) : base(nome, email, senha, cpf)
        {
        }
    }
}