import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Container, TextDetail, Title } from "components";
import Logo from "../assets/Logo";
import { Alert, Snackbar, TextField } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import useBreakpoint from "hooks/use-breakpoint";

export default function Register(
  props: PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n>
) {
  const { isLg } = useBreakpoint("lg");
  const { kcContext } = props;

  const { url, message } = kcContext;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [submitHeight, setSubmitHeight] = useState("0px");
  const submitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitRef.current) {
      setSubmitHeight(`${submitRef.current.clientHeight}px`);
    }
  }, [submitRef]);

  const disableAuthButton = useMemo(() => {
    return (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !passwordConfirm ||
      password !== passwordConfirm
    );
  }, [firstName, lastName, email, password, passwordConfirm]);

  const disableLgButton = useMemo(() => {
    return (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !passwordConfirm ||
      password !== passwordConfirm
    );
  }, [firstName, lastName, email, password, passwordConfirm]);

  return (
    <Container>
      <main className="p-8 overflow-hidden lg:flex lg:h-screen lg:p-0 col-span-full">
        <figure className="relative hidden lg:block g:max-h-screen lg:h-screen lg:overflow-auto lg:w-1/2">
          <img
            src="https://s3-alpha-sig.figma.com/img/7e70/6adc/138cc549fa73b72f63821d5bc2c1aef5?Expires=1699228800&Signature=H7yl-CLoTC7Ix8ptTMn3KEPYR9Uj3DAgLMQ1PhZX54Dk025988T~vgryENrZD0qVms-d6hdUTxm2L-oAC308y28QFtFoe9GiBb2JMVHsU2z5jbnpeDOgLVNNirth-Yi4zcM6iQAIurDNQ7Y3kzaRGR1ky3y9bgqIvbBVL~RIF-PEFbaLBBmZTXjzNY~huUWf00Yv4dOs2V0h75sgliEogGXs3WYZqa0mpAjgAqZ4Slt3KYUdpmsmt5yJAxnd4pUV33p3gclXn0VKKAnbpnomPqHwONu7Q5Lm-W7B584h8UXX1yeiW0Ff~JsDoKzk9587g9gUt4Fa4NOoK5L3zLNDMg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            alt="register-background"
            className="mx-auto lg:h-full"
          />
          <div className="absolute top-0 left-0 w-1/2 h-full -z-10 bg-primary"></div>
        </figure>
        <section className="lg:w-1/2 lg:px-8 lg:pt-4 lg:overflow-auto lg:pl-0 lg:pr-20">
          <header className="flex justify-between w-full mb-4 lg:justify-end lg:w-full">
            <div className="flex flex-col justify-between gap-4 lg:hidden">
              <button
                className="cursor-pointer"
                onClick={() => {
                  window.location.href = url.loginUrl;
                }}
              >
                <ChevronLeftIcon className="w-8 h-8 min-w-[32px] min-h-[32px]" />
              </button>
              <Title variant="h2" className="font-bold">
                Registro
              </Title>
            </div>
            <Title
              variant="h1"
              className="hidden w-full text-center font-regular lg:block"
            >
              Registro
            </Title>
            <Logo />
          </header>

          <TextDetail size="xs" weight="bold" className="lg:hidden">
            Completar los siguientes campos:
          </TextDetail>
          <form
            id="kc-register-form"
            action={url.registrationAction}
            method="post"
            className="mt-4 lg:mt-0"
            style={{ marginBottom: submitHeight }}
          >
            <section className="flex flex-col gap-6">
              <>
                <article className="flex flex-col gap-2 lg:gap-0">
                  <TextField
                    label="Nombre"
                    variant="outlined"
                    type="text"
                    name="firstName"
                    id="firstName"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    value={firstName}
                    className="w-full"
                    placeholder="Nombre"
                  />
                </article>
                <article className="flex flex-col gap-2 lg:gap-0">
                  <TextField
                    label="Apellidos"
                    variant="outlined"
                    type="text"
                    name="lastName"
                    id="lastName"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    value={lastName}
                    className="w-full"
                    placeholder="Apellido"
                  />
                </article>
                <article className="flex flex-col gap-2 lg:gap-0">
                  <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    className="w-full"
                    placeholder="jessi@tuemail.com"
                  />
                </article>
                <article className="hidden">
                  <TextField
                    type="text"
                    name="username"
                    id="username"
                    value={email}
                    className="w-full"
                  />
                </article>
                <article className="flex flex-col gap-2 lg:gap-0">
                  <TextField
                    label="Contraseña"
                    variant="outlined"
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                    className="w-full"
                    placeholder="Introduce acá tu contraseña"
                  />
                </article>
                <article className="flex flex-col gap-2 lg:gap-0">
                  <TextField
                    label="Confirmar contraseña"
                    variant="outlined"
                    type="password"
                    name="password-confirm"
                    id="password-confirm"
                    onChange={(e) => {
                      setPasswordConfirm(e.target.value);
                    }}
                    value={passwordConfirm}
                    className="w-full"
                    placeholder="Vuelve a introducir la contraseña"
                  />
                </article>
              </>
              {/* {(currentPage === "demo" || isLg) && (
              <>
                <article className="flex flex-col gap-2 lg:gap-0">
                  <TextField
                    label="Teléfono"
                    variant="outlined"
                    type="text"
                    name="phone"
                    id="phone"
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    value={phone}
                    className="w-full"
                    placeholder="Introduce aca tu teléfono"
                  />
                </article>
                <article className="flex flex-col gap-2 lg:gap-0">
                  <FormControl fullWidth>
                    <InputLabel id="location">Ubicación</InputLabel>
                    <Select
                      labelId="location"
                      label="Ubicación"
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      <MenuItem value="1">Bogotá</MenuItem>
                      <MenuItem value="2">Medellin</MenuItem>
                      <MenuItem value="3">Buenos Aires</MenuItem>
                    </Select>
                  </FormControl>
                </article>
              </>
            )} */}
            </section>
            {isLg && (
              <section
                className="flex flex-col items-center justify-center w-full gap-6 p-8 bg-[white]"
                ref={submitRef}
              >
                <button
                  className={classNames(
                    "rounded-3xl bg-primary text-center py-3 mt-5 lg:mt-0 w-full",
                    {
                      "opacity-40": disableLgButton,
                    }
                  )}
                  type="submit"
                  disabled={disableLgButton}
                >
                  <TextDetail size="s" weight="bold">
                    Crear cuenta
                  </TextDetail>
                </button>
                <button
                  onClick={() => {
                    window.location.href = url.loginUrl;
                  }}
                >
                  <TextDetail size="xs" weight="regular">
                    ¿Ya tienes cuenta?{" "}
                    <a className="font-bold" href={url.loginUrl}>
                      Inicia sesión
                    </a>
                  </TextDetail>
                </button>
              </section>
            )}
            {!isLg && (
              <section
                className="lg:relative fixed bottom-0 left-0 flex flex-col items-center justify-center w-full gap-6 p-8 bg-[white]"
                ref={submitRef}
              >
                <button
                  className={classNames(
                    "rounded-3xl bg-primary text-center py-3 mt-5 lg:mt-0 w-full",
                    {
                      "opacity-40": disableAuthButton,
                    }
                  )}
                  disabled={disableAuthButton}
                  type="submit"
                >
                  <TextDetail size="s" weight="bold">
                    Continuar
                  </TextDetail>
                </button>
                <button
                  onClick={() => {
                    window.location.href = url.loginUrl;
                  }}
                >
                  <TextDetail size="xs" weight="regular" className="lg:hidden">
                    ¿Ya tienes cuenta?{" "}
                    <a className="font-bold" href={url.loginUrl}>
                      Inicia sesión
                    </a>
                  </TextDetail>
                </button>
              </section>
            )}
          </form>
          {!!message && (
            <Snackbar
              open
              anchorOrigin={{
                vertical: isLg ? "bottom" : "top",
                horizontal: "right",
              }}
            >
              <Alert severity="error" sx={{ width: "100%" }}>
                Registor invalido.
              </Alert>
            </Snackbar>
          )}
        </section>
      </main>
    </Container>
  );
}
