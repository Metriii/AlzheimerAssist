namespace AlzheimerAssist.Models.Usuarios
{
    public class Cuidador : Usuario
    {
        public Cuidador()
        {

        }

        public Cuidador(
            string nome,
            string email,
            string senhaHash,
            string cpf)
            : base(
                nome,
                email,
                senhaHash,
                cpf)
        {

        }
    }
}