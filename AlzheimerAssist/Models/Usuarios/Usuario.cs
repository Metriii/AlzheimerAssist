using System.ComponentModel.DataAnnotations;

namespace AlzheimerAssist.Models.Usuarios
{
    public abstract class Usuario
    {
        // Propriedades
        public int Id { get;  set; }

        [Required]
        public string Nome { get;  set; } = null!;

        [Required]
        public string Email { get;  set; } = null!;

        [Required]
        public string SenhaHash { get;  set; } = null!;

        [Required]
        public string Cpf { get;  set; } = null!;


        public Usuario()
        {

        }

        public Usuario(
            string nome,
            string email,
            string senhaHash,
            string cpf)
        {
            Nome = nome;
            Email = email;
            SenhaHash = senhaHash;
            Cpf = cpf;
        }

        protected void DefinirSenhaHash(string senhaHash)
        {
            if (string.IsNullOrWhiteSpace(senhaHash))
                throw new ArgumentException("Senha inválida");

            SenhaHash = senhaHash;
        }

    }
}