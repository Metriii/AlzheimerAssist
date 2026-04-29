using System.ComponentModel.DataAnnotations;

namespace AlzheimerAssist.Models.Usuarios
{
    public abstract class Usuario
    {
        // Propriedades
        public int Id { get; private set; }

        [Required]
        public string Nome { get; private set; } = null!;

        [Required]
        public string Email { get; private set; } = null!;

        [Required]
        public string SenhaHash { get; private set; } = null!;

        [Required]
        public string Cpf { get; private set; } = null!;


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

    }
}