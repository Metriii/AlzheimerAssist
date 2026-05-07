namespace AlzheimerAssist.Models.Usuarios
{
    public class Paciente : Usuario
    {
    public ICollection<Cuidador> Cuidadores { get; private set; }
    = new List<Cuidador>();

    public ICollection<MedicoPaciente> Medicos { get; private set; }
        = new List<MedicoPaciente>();
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
            Nome = nome;
            Email = email;
            DefinirSenhaHash(senhaHash);
            Cpf = cpf;
        }
    }
}