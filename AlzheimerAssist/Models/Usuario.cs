namespace AlzheimerAssist.Models
{
    public abstract class Usuario
    {
        public int Id { get; private set; }

        public string Nome { get; private set; } = string.Empty;

        public string Email { get; private set; } = string.Empty;

        public string Senha { get; private set; } = string.Empty;

        public string Cpf { get; private set; } = string.Empty;

        public Usuario()
        {
        }

        public Usuario(
            string nome,
            string email,
            string senha,
            string cpf
        )
        {
            Nome = nome;
            Email = email;
            Senha = senha;
            Cpf = cpf;
        }
    }
}