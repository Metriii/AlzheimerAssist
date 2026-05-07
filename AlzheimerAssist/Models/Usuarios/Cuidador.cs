using AlzheimerAssist.Models.Usuarios;

namespace AlzheimerAssist.Models.Usuarios
{
    public class Cuidador : Usuario
    {
        public int PacienteId { get; private set; }

        public Paciente Paciente { get; private set; } = null!;
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
            Nome = nome;
            Email = email;
            DefinirSenhaHash(senhaHash);
            Cpf = cpf;
        }
    }
}