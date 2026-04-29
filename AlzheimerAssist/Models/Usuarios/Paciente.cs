namespace AlzheimerAssist.Models.Usuarios
{
    public class Paciente : Usuario
    {
        public Paciente()
        {

        }

        public Paciente(
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