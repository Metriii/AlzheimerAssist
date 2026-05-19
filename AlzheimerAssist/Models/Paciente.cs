namespace AlzheimerAssist.Models
{
    public class Paciente : Usuario
    {
        public string Foto { get; private set; } = string.Empty;

        protected Paciente()
        {
        }

        public Paciente(
            string nome,
            string email,
            string senha,
            string cpf,
            string foto
        ) : base(nome, email, senha, cpf)
        {
            Foto = foto;
        }
    }
}