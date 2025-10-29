import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSpan,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { validatePassword } from "@/utils/passwordValidation"

interface SignupFormProps {
  className?: string;
  onSignup?: (user: {email: string; password: string; name: string}) => Promise<void>;
}

export function SignupForm({
  className,
  onSignup,
}: SignupFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const router = useRouter();

  // Validate password requirements in real-time
  useEffect(() => {
    if (password) {
      const validation = validatePassword(password);
      setPasswordErrors(validation.missingRequirements);
    } else {
      setPasswordErrors([]);
    }
  }, [password]);

  // Validate password match
  useEffect(() => {
    const handler = setTimeout(() => {
      if (password && confirmPassword && password !== confirmPassword) {
        setError("Passwords do not match");
      } else if (password && confirmPassword && password === confirmPassword) {
        setError(null);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password requirements
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setPasswordErrors(passwordValidation.missingRequirements);
      setError("Please fix password requirements");
      return;
    }
    
    // Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setPasswordErrors([]);

    try {
      if (onSignup) {
        await onSignup({email, password, name});
        router.push('/');
      }
    } catch {
      setError('Signup Failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  // Check if form is valid for button disable state
  const isFormValid = () => {
    const passwordValidation = validatePassword(password);
    return (
      email.trim() !== '' &&
      name.trim() !== '' &&
      passwordValidation.isValid &&
      password === confirmPassword &&
      password !== '' &&
      confirmPassword !== ''
    );
  };

  return (
    <div className={cn("flex flex-col gap-6 bg-mute z-50", className)}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Full Name"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  required
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type="password"
                      required
                    />
                  </Field>
                </Field>
                
                {/* Show password requirements */}
                {password && passwordErrors.length > 0 && (
                  <FieldSpan className="text-red-500 mt-2">
                    <span>Password must contain:</span>
                    <ul className="list-disc list-inside ml-4 mt-1">
                      {passwordErrors.map((req, index) => (
                        <li key={index} className="text-sm">{req}</li>
                      ))}
                    </ul>
                  </FieldSpan>
                )}
                
                {/* Show success message when all requirements met */}
                {password && passwordErrors.length === 0 && (
                  <FieldDescription className="text-green-500 mt-2 text-sm">
                    ✓ Password meets all requirements
                  </FieldDescription>
                )}
                
                {/* Show general error (like password mismatch) */}
                {error && passwordErrors.length === 0 && (
                  <FieldDescription className="text-red-500 mt-2">
                    {error}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <Button 
                  type="submit" 
                  disabled={!isFormValid() || isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}